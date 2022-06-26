import PluginActions from './enums/PluginActions';
import { ItemDefaultParametrs, ItemDefaultState } from './interfaces';
import ViewConnector from './ViewConnector';

type UserOptionsType =
  | string
  | number
  | Array<number>
  | Array<string>
  | boolean
  | ((state: RootState, id: number) => RootState)
  | undefined;

type ItemDefaultParametrsType = string | number | undefined;

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
  trigger: (actions: PluginActions, ...args: Array<Object>) => void;
  onDestroySubscriber: (handler: () => void) => void;
  onChangeStateSubscriber: (handler: (state?: RootState, payload?: Payload) => void) => void;
};

type DropdownDomOptions = {
  viewConnector: ViewConnector;
  getEventNames: () => Actions;
  trigger: (actions: PluginActions, ...args: Array<Object>) => void;
  onChangeStateSubscriber: (handler: (state?: RootState, payload?: Payload) => void) => void;
};

type Actions = {
  onClick: string;
};

type Payload = {
  id?: number;
  title?: string;
  init?: boolean;
  defaultItemParametrs?: ItemDefaultParametrs;
};

type BrowserEvent = MouseEvent & TouchEvent;

export {
  UserOptionsType,
	ItemDefaultParametrsType,
  RootState,
  DefaultItem,
  ItemValueType,
  DefaultItemDomOptions,
  DropdownDomOptions,
  Actions,
  BrowserEvent,
  Payload,
};
