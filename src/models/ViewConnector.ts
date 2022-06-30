import { Item } from './types';

interface ViewConnector {
  dropdown: HTMLElement;
  setValueToInput: (value: string) => void;
  openDropdown: () => void;
  closedDropdown: () => void;
  item: Item;
}

export default ViewConnector;
