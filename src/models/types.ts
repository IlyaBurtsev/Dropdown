import PluginActions from './enums/PluginActions';
import { ItemParametrs, ItemState } from './interfaces';
import ViewConnector from './ViewConnector';

type UserOptionsType =
  | string
  | number
  | Array<number>
  | Array<string>
  | boolean
  | ((state: RootState, id: number, type: string) => RootState)
  | undefined;

type ItemParametrsType = string | number | undefined;

type RootState = {
  title: string;
  itemStates: Array<ItemState>;
};

type Item = {
  container: HTMLElement;
  addButtonClassName: string;
  subButtonClassName: string;
  setValue: (value: string, parentElement: HTMLElement) => void;
  setItemName: (name: string, parentElement: HTMLElement) => void;
};

type ItemValueType = number;

type ItemDomOptions = {
  viewConnector: ViewConnector;
  numberOfItems: number;
  onDestroySubscriber: (handler: () => void) => void;
  onChangeStateSubscriber: (handler: (state?: RootState, payload?: Payload) => void) => void;
};

type DropdownDomOptions = {
	autoClose: boolean;
  viewConnector: ViewConnector;
  getEventNames: () => Actions;
  trigger: (actions: PluginActions, ...args: Array<Object>) => void;
  onChangeStateSubscriber: (handler: (state?: RootState, payload?: Payload) => void) => void;
};

type Actions = {
  onClick: string;
};

type Payload = {
  changeType: string;
  id?: number;
  title?: string;
  itemParametrs?: ItemParametrs;
};

type BrowserEvent = MouseEvent & TouchEvent;

export {
  UserOptionsType,
  ItemParametrsType,
  RootState,
  Item,
  ItemValueType,
  ItemDomOptions,
  DropdownDomOptions,
  Actions,
  BrowserEvent,
  Payload,
};
