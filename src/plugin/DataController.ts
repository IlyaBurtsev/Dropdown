import ChangeStateTypes from '../models/enums/ChangeStateTypes';
import { DropdownOptions, UserOptions } from '../models/interfaces';
import { Actions, ItemDefaultState, RootState } from '../models/types';
import { deepMerge } from './utils/utils';

class DataController {
  private rootState: RootState;
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
  constructor(userOptions?: UserOptions) {
    this.updateOptions(userOptions);
    this.rootState = this.initState();
  }

  public getActions = (): Actions => {
    return this.actions;
  };

  public getNumberOfDefaultItems = (): number => {
    return this.rootState.defaultStates.length;
  };

  public changeState = (type: ChangeStateTypes, state: RootState, id: number): RootState => {
    if (id === -1) {
      return state;
    }
		let newState: RootState = state;
    const { incrementStep } = this.options;
    const { defaultStates } = newState;
    
    switch (type) {
      case ChangeStateTypes.addButtonClicked: {
        defaultStates[id].value += incrementStep;
				return newState
      }
      case ChangeStateTypes.subButtonClicked: {
        defaultStates[id].value -= incrementStep;
				return newState
      }
    }
    return state;
  };
  private updateOptions = (newOptions?: UserOptions): void => {
    if (newOptions) {
      this.options = deepMerge(this.options, false, newOptions);
    }
  };

  private initState = (): RootState => {
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
