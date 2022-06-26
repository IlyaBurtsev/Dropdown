import ChangeStateTypes from '../models/enums/ChangeStateTypes';
import PluginActions from '../models/enums/PluginActions';
import { DropdownOptions, ItemDefaultState, UserOptions } from '../models/interfaces';
import { Actions, Payload, RootState } from '../models/types';
import { deepMerge } from './utils/utils';

class DataController {
  private numberOfDefaultItems: number;
  private trigger: (actions: PluginActions, ...args: Array<Object>) => void;
  private options: DropdownOptions = {
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

  public changeState = (type: ChangeStateTypes, state: RootState, payload?: Payload): RootState => {
    if (payload === undefined) {
      return state;
    }
    const { id, title, defaultItemParametrs } = payload;
    let newState: RootState;
    const { externalCheckState } = this.options;

    switch (type) {
      case ChangeStateTypes.addButtonClicked: {
        if (id === undefined) {
          return state;
        }
        newState = this.checkState(state, id, true);
        if (externalCheckState !== undefined) {
          newState = externalCheckState(newState, id);
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
          newState = externalCheckState(newState, id);
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

      case ChangeStateTypes.changeDefaultItem: {
        const { defaultStates } = state;
        if (defaultItemParametrs === undefined || id === undefined) {
          return state;
        }
        let item = defaultStates[id];
        item = deepMerge(item, false, defaultItemParametrs);
        defaultStates[id] = this.checkDefaultItem(item);
				if (externalCheckState !== undefined) {
          state = externalCheckState(state, id);
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
    const { incrementStep } = this.options;
    const { defaultStates } = state;
    const item = defaultStates[id];
    const { minValue, maxValue } = item;
    let { value } = item;
    add ? (value += incrementStep) : (value -= incrementStep);
    item.value = value;
    defaultStates[id] = this.checkDefaultItem(item);
    return state;
  };

  private checkDefaultItem = (item: ItemDefaultState): ItemDefaultState => {
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
    const { itemNames, startValues, minValueItem, maxValueItem, titlePlaceholder, externalCheckState } = this.options;
    const itemStates: Array<ItemDefaultState> = [];
    let state: RootState = {
      title: titlePlaceholder,
      defaultStates: itemStates,
    };

    if (Array.isArray(itemNames)) {
      itemNames.forEach((itemName, index) => {
        const itemState: ItemDefaultState = {
          itemName: itemName,
          minValue: minValueItem,
          maxValue: maxValueItem,
          value: 0,
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
          state = externalCheckState(state, index);
        }
      });
    } else {
      const itemState: ItemDefaultState = {
        itemName: itemNames,
        minValue: minValueItem,
        maxValue: maxValueItem,
        value: 0,
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
        state = externalCheckState(state, 0);
      }
    }
    return state;
  };
}

export default DataController;
