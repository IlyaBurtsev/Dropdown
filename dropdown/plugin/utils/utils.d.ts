import { ItemParametrs, UserOptions } from '../../models/interfaces';
import { BrowserEvent } from '../../models/types';
declare function deepMerge<T extends UserOptions | ItemParametrs>(target: T, allowAddOptions: boolean, ...objects: Array<UserOptions | ItemParametrs>): T;
declare function bindEvents(events: Array<string>, listener: EventListener, element: HTMLElement, supportPassive?: boolean): void;
declare function removeEvents(events: Array<string>, listener: EventListener, element: HTMLElement): void;
declare function removeElementsFromDom(elements: Array<HTMLElement>, startIndex: number): void;
declare function checkTouchByClassName(event: BrowserEvent, classNames: Array<string>): boolean | Touch;
export { deepMerge, bindEvents, removeEvents, removeElementsFromDom, checkTouchByClassName, };
