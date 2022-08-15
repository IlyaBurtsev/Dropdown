import PluginActions from './enums/PluginActions';
import { ItemParametrs, ItemState } from './interfaces';
import ViewConnector from './ViewConnector';
declare type UserOptionsType = string | number | Array<number> | Array<string> | boolean | ((state: RootState, id: number, type: string) => RootState) | undefined;
declare type ItemParametrsType = string | number | undefined;
declare type RootState = {
    title: string;
    itemStates: Array<ItemState>;
};
declare type Item = {
    container: HTMLElement;
    addButtonClassName: string;
    subButtonClassName: string;
    setValue: (value: string, parentElement: HTMLElement) => void;
    setItemName: (name: string, parentElement: HTMLElement) => void;
};
declare type ItemValueType = number;
declare type ItemDomOptions = {
    viewConnector: ViewConnector;
    numberOfItems: number;
    onDestroySubscriber: (handler: () => void) => void;
    onChangeStateSubscriber: (handler: (state?: RootState, payload?: Payload) => void) => void;
};
declare type DropdownDomOptions = {
    autoClose: boolean;
    viewConnector: ViewConnector;
    getEventNames: () => Actions;
    trigger: (actions: PluginActions, ...args: Array<Object>) => void;
    onChangeStateSubscriber: (handler: (state?: RootState, payload?: Payload) => void) => void;
};
declare type Actions = {
    onClick: string;
};
declare type Payload = {
    changeType: string;
    id?: number;
    title?: string;
    itemParametrs?: ItemParametrs;
};
declare type BrowserEvent = MouseEvent & TouchEvent;
export { UserOptionsType, ItemParametrsType, RootState, Item, ItemValueType, ItemDomOptions, DropdownDomOptions, Actions, BrowserEvent, Payload, };
