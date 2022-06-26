import { ItemDefaultParametrsType, ItemValueType, RootState, UserOptionsType } from './types';

interface DataObject<T> {
  [id: string]: T;
}

interface UserOptions extends DataObject<UserOptionsType> {
  titlePlaceholder?: string;
  minValueItem?: number;
  maxValueItem?: number;
  itemNames?: Array<string> | string;
  startValues?: Array<ItemValueType> | number;
  incrementStep?: number;
	externalCheckState?: ((state : RootState, id: number) => RootState)
}

interface DropdownOptions extends UserOptions {
  titlePlaceholder: string;
  minValueItem: number;
  maxValueItem: number;
  itemNames: Array<string> | string;
  startValues: Array<ItemValueType> | number;
  incrementStep: number;
	externalCheckState?: ((state : RootState, id: number) => RootState)
}

interface ItemDefaultParametrs extends DataObject<ItemDefaultParametrsType> {
  itemName?: string;
  minValue?: number;
  maxValue?: number;
  value?: number;
};

interface ItemDefaultState extends ItemDefaultParametrs {
  itemName: string;
  minValue: number;
  maxValue: number;
  value: number;
};

export { DataObject, UserOptions, DropdownOptions, ItemDefaultParametrs, ItemDefaultState };
