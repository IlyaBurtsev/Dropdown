import PluginActions from './enums/PluginActions';
import ViewConnector from './ViewConnector';

type UserOptionsType = string | number | Array<number> | Array<string> | boolean | undefined;

type ItemDefaultState = {
  itemName: string;
  minValue: number;
  maxValue: number;
  value: number;
};

type RootState = {
  title: string;
  defaultStates: Array<ItemDefaultState>;
};

type DefaultItem = {
  container: HTMLElement;
  addButtonClassName: string;
  subButtonClassName: string;
  setValue: (value: string, parentElement: HTMLElement) => void;
  setItemName: (name: string, parentElement: HTMLElement) => void;
};

type ItemValueType = number;

type DefaultItemDomOptions = {
  viewConnector: ViewConnector;
  numberOfItems: number;
  onDestroySubscriber: (handler: () => void) => void;
	onChangeStateSubscriber: (handler: (state?: RootState, id?: number) => void) => void;
};

type DropdownDomOptions = {
  viewConnector: ViewConnector;
	getEventNames: () => Actions,
	trigger: (actions: PluginActions, ...args: Array<Object>) => void,
	onChangeStateSubscriber: (handler: (state?: RootState, id?: number) => void) => void;
};

type Actions = {
  onClick: string;
};

type BrowserEvent = MouseEvent & TouchEvent;

export {
  UserOptionsType,
  ItemDefaultState,
  RootState,
	DefaultItem,
  ItemValueType,
  DefaultItemDomOptions,
  DropdownDomOptions,
  Actions,
  BrowserEvent,
};
