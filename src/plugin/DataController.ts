import ChangeStateTypes from '../models/enums/ChangeStateTypes';
import PluginActions from '../models/enums/PluginActions';
import { DropdownOptions, ItemState, UserOptions } from '../models/interfaces';
import { Actions, Payload, RootState } from '../models/types';
import { deepMerge } from './utils/utils';

class DataController {
  private numberOfDefaultItems: number;
  private trigger: (actions: PluginActions, ...args: Array<Object>) => void;
  private options: DropdownOptions = {
		autoClose: true,
    titlePlaceholder: '',
    minValueItem: 0,
    maxValueItem: 100,
    startValues: 0,
    itemNames: 'item',
    incrementStep: 1,
  };

  private actions: Actions = {
    onClick: 'click',
  };
  constructor(trigger: (actions: PluginActions, ...args: Array<Object>) => void, userOptions?: UserOptions) {
    this.updateOptions(userOptions);
    this.numberOfDefaultItems = this.setNumberOfDefaultItems();
    this.trigger = trigger;
  }

  public getActions = (): Actions => {
    return this.actions;
  };

  public getNumberOfDefaultItems = (): number => {
    return this.numberOfDefaultItems;
  };

	public autoClose = (): boolean => {
		const {autoClose} = this.options
		return autoClose;
	}

  public changeState = (state: RootState, payload: Payload): RootState => {
    const { changeType, id, title, itemParametrs: defaultItemParametrs } = payload;
    let newState: RootState;
    const { externalCheckState } = this.options;

    switch (changeType) {
      case ChangeStateTypes.addButtonClicked: {
        if (id === undefined) {
          return state;
        }
        newState = this.checkState(state, id, true);
        if (externalCheckState !== undefined) {
          newState = externalCheckState(newState, id, changeType);
        }
        this.trigger(PluginActions.onChangeState, newState, payload);
        return newState;
      }
      case ChangeStateTypes.subButtonClicked: {
        if (id === undefined) {
          return state;
        }
        newState = this.checkState(state, id, false);
        if (externalCheckState !== undefined) {
          newState = externalCheckState(newState, id, changeType);
        }
        this.trigger(PluginActions.onChangeState, newState, payload);
        return newState;
      }
      case ChangeStateTypes.changeTitle: {
        if (title === undefined) {
          return state;
        }
        state.title = title;
        this.trigger(PluginActions.onChangeState, state, payload);
        return state;
      }

      case ChangeStateTypes.changeItem: {
        const { itemStates: defaultStates } = state;
        if (defaultItemParametrs === undefined || id === undefined) {
          return state;
        }
        let item = defaultStates[id];
        item = deepMerge(item, false, defaultItemParametrs);
        defaultStates[id] = this.checkItem(item);
        if (externalCheckState !== undefined) {
          state = externalCheckState(state, id, changeType);
        }
        this.trigger(PluginActions.onChangeState, state, payload);
        return state;
      }
    }
    return state;
  };
  private updateOptions = (newOptions?: UserOptions): void => {
    if (newOptions) {
      this.options = deepMerge(this.options, true, newOptions);
    }
  };

  private setNumberOfDefaultItems = (): number => {
    const { itemNames } = this.options;
    if (Array.isArray(itemNames)) {
      return itemNames.length;
    } else {
      return 1;
    }
  };
  private checkState = (state: RootState, id: number, add: boolean): RootState => {
    const { itemStates } = state;
    const item = itemStates[id];
    const { incrementStep } = item;
    let { value } = item;
    add ? (value += incrementStep) : (value -= incrementStep);
    item.value = value;
    itemStates[id] = this.checkItem(item);
    return state;
  };

  private checkItem = (item: ItemState): ItemState => {
    const { minValue, maxValue } = item;
    let { value } = item;
    if (value < minValue) {
      item.value = minValue;
    }
    if (value > maxValue) {
      item.value = maxValue;
    }
    return item;
  };

  public initState = (): RootState => {
    const { itemNames, startValues, minValueItem, maxValueItem, incrementStep, titlePlaceholder, externalCheckState } = this.options;
    const itemStates: Array<ItemState> = [];
    let state: RootState = {
      title: titlePlaceholder,
      itemStates: itemStates,
    };

    if (Array.isArray(itemNames)) {
      itemNames.forEach((itemName, index) => {
        const itemState: ItemState = {
          itemName: itemName,
          minValue: minValueItem,
          maxValue: maxValueItem,
          value: 0,
					incrementStep: incrementStep,
        };
        if (Array.isArray(startValues)) {
          if (startValues.length === itemNames.length) {
            itemState.value = startValues[index];
          } else {
            itemState.value = 0;
          }
        } else {
          itemState.value = startValues;
        }
        itemStates.push(itemState);
        if (externalCheckState !== undefined) {
          state = externalCheckState(state, index, ChangeStateTypes.init);
        }
      });
    } else {
      const itemState: ItemState = {
        itemName: itemNames,
        minValue: minValueItem,
        maxValue: maxValueItem,
        value: 0,
				incrementStep: incrementStep,
      };
      if (Array.isArray(startValues)) {
        if (startValues.length === 1) {
          [itemState.value] = startValues;
        }
      } else {
        itemState.value = startValues;
      }
      itemStates.push(itemState);
      if (externalCheckState !== undefined) {
        state = externalCheckState(state, 0, ChangeStateTypes.init);
      }
    }
    return state;
  };
}

export default DataController;
