import { ItemValueType, UserOptionsType } from './types';

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
}

interface DropdownOptions extends UserOptions {
  titlePlaceholder: string;
  minValueItem: number;
  maxValueItem: number;
  itemNames: Array<string> | string;
  startValues: Array<ItemValueType> | number;
  incrementStep: number;
}

export { DataObject, UserOptions, DropdownOptions };
