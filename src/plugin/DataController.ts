import ChangeStateTypes from '../models/enums/ChangeStateTypes';
import PluginActions from '../models/enums/PluginActions';
import { DropdownOptions, UserOptions } from '../models/interfaces';
import { Actions, ItemDefaultState, RootState } from '../models/types';
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

  public changeState = (type: ChangeStateTypes, state: RootState, id?: number): RootState => {
    if (id === undefined) {
      return state;
    }
    let newState: RootState = state;
    const { incrementStep } = this.options;
    const { defaultStates } = newState;

    switch (type) {
      case ChangeStateTypes.addButtonClicked: {
        defaultStates[id].value += incrementStep;
				defaultStates[id] = this.checkState(defaultStates[id])
        this.trigger(PluginActions.onChangeState, newState, id);
        return newState;
      }
      case ChangeStateTypes.subButtonClicked: {
        defaultStates[id].value -= incrementStep;
				defaultStates[id] = this.checkState(defaultStates[id])
        this.trigger(PluginActions.onChangeState, newState, id);
        return newState;
      }
    }
    return state;
  };
  private updateOptions = (newOptions?: UserOptions): void => {
    if (newOptions) {
      this.options = deepMerge(this.options, false, newOptions);
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
  private checkState = (defaultState: ItemDefaultState): ItemDefaultState => {
    const { minValue, maxValue, value } = defaultState;
    if (value < minValue) {
      defaultState.value = minValue;
    }
    if (value > maxValue) {
      defaultState.value = maxValue;
    }
    return defaultState;
  };

  public initState = (): RootState => {
    const { itemNames, startValues, minValueItem, maxValueItem, titlePlaceholder } = this.options;
    const itemStates: Array<ItemDefaultState> = [];

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
    }
    return {
      title: titlePlaceholder,
      defaultStates: itemStates,
    };
  };
}

export default DataController;
