import ChangeStateTypes from '../models/enums/ChangeStateTypes';
import PluginActions from '../models/enums/PluginActions';
import { Actions, BrowserEvent } from '../models/types';
import { bindEvents, checkTouchByClassName } from './utils/utils';

class DropdownListener {
  private eventNames: () => Actions;
  private trigger: (actions: PluginActions, ...args: Array<Object>) => void;
  private addButtonClassName: string;
  private subButtonClassName: string;
  constructor(
    dropdown: HTMLElement,
    defaultItem: DefaultItem,
    getEventNames: () => Actions,
    trigger: (actions: PluginActions, ...args: Array<Object>) => void,
  ) {
    const { addButtonClassName, subButtonClassName } = defaultItem;
    this.addButtonClassName = addButtonClassName;
    this.subButtonClassName = subButtonClassName;
    this.eventNames = getEventNames;
    this.trigger = trigger;
    bindEvents(this.eventNames().onClick.split(' '), this.onClickDropdown, dropdown);
  }

  private onClickDropdown = (event: BrowserEvent): void => {
    let element: HTMLElement;
    const result: Touch | boolean = checkTouchByClassName(event, [this.addButtonClassName, this.subButtonClassName]);
    if (!result) {
      return;
    } else {
      if (result instanceof Touch) {
        element = result.target as HTMLElement;
      } else {
        element = event.target as HTMLElement;
      }
    }
    this.detectEvent(element);
  };

  private detectEvent = (element: HTMLElement): void => {
    let id = -1;
    if (element.classList.contains(this.addButtonClassName)) {
      if (element.getAttribute('id') !== null) {
        id = Number(element.getAttribute('id'))
      }
      this.trigger(PluginActions.onChangeState, ChangeStateTypes.addButtonClicked, id);
    }
    if (element.classList.contains(this.subButtonClassName)) {
			if (element.getAttribute('id') !== null) {
        id = Number(element.getAttribute('id'))
      }
      this.trigger(PluginActions.onChangeState, ChangeStateTypes.subButtonClicked, id);
    }
  };
}

export default DropdownListener;
