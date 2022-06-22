import { DefaultItem } from './types';

interface ViewConnector {
  dropdown: HTMLElement;
  setValueToInput: (value: string) => void;
  openDropdown: () => void;
  closedDropdown: () => void;
  defaultItem: DefaultItem;
}

export default ViewConnector;
