import { ItemParametrsType, ItemValueType, RootState, UserOptionsType } from './types';

interface DataObject<T> {
  [id: string]: T;
}

interface UserOptions extends DataObject<UserOptionsType> {
	autoClose?: boolean;
  titlePlaceholder?: string;
  minValueItem?: number;
  maxValueItem?: number;
  itemNames?: Array<string> | string;
  startValues?: Array<ItemValueType> | number;
  incrementStep?: number;
	externalCheckState?: ((state : RootState, id: number, changeStateType: string) => RootState)
}

interface DropdownOptions extends UserOptions {
	autoClose: boolean;
  titlePlaceholder: string;
  minValueItem: number;
  maxValueItem: number;
  itemNames: Array<string> | string;
  startValues: Array<ItemValueType> | number;
  incrementStep: number;
	externalCheckState?: ((state : RootState, id: number, changeStateType: string) => RootState)
}

interface ItemParametrs extends DataObject<ItemParametrsType> {
  itemName?: string;
  minValue?: number;
  maxValue?: number;
  value?: number;
	incrementStep?: number;
};

interface ItemState extends ItemParametrs {
  itemName: string;
  minValue: number;
  maxValue: number;
  value: number;
	incrementStep: number;
};

export { DataObject, UserOptions, DropdownOptions, ItemParametrs, ItemState };
