import ChangeStateTypes from '../models/enums/ChangeStateTypes';
import { DropdownDomOptions, Payload, RootState } from '../models/types';
import DropdownListener from './DropdownListener';

class DropdownDomController {
  private dropdownListener: DropdownListener;
  private dropdown: HTMLElement;
  private setValueToInput: (value: string) => void;
  private onChangeStateSubscriber: Function;
  private openDropdown: Function;
  private closedDropdown: Function;
  constructor(options: DropdownDomOptions) {
    const { viewConnector, getEventNames, trigger, onChangeStateSubscriber , autoClose} = options;
    const { dropdown, item: defaultItem, openDropdown, closedDropdown, setValueToInput } = viewConnector;
    this.dropdownListener = new DropdownListener(dropdown, defaultItem, getEventNames, trigger);
    this.dropdown = dropdown;
    this.setValueToInput = setValueToInput;
    this.onChangeStateSubscriber = onChangeStateSubscriber;
    this.openDropdown = openDropdown;
    this.closedDropdown = closedDropdown;
    dropdown.tabIndex = 0;
		onChangeStateSubscriber(this.onChangeState);
		dropdown.addEventListener('focusin', this.onFocus, true);
		if (autoClose) {
			dropdown.addEventListener('blur', this.onBlur);
		}
  }

	public handleClosedDropdown = (): void =>{
		this.closedDropdown();
		this.dropdown.blur()
	}

  private onChangeState = (state: RootState, payload: Payload): void => {
    const { changeType, title } = payload;
    if (changeType === ChangeStateTypes.init) {
      const { title } = state;
      this.setValueToInput(title);
    } else {
      if (title !== undefined) {
        this.setValueToInput(title);
      }
    }
  };

  private onFocus = (e: MouseEvent): void => {
    const element: HTMLElement = e.target as HTMLElement;

    if (this.dropdown.contains(element)) {
      this.dropdown.focus();
    }
    this.openDropdown();
  };
  private onBlur = (e: MouseEvent): void => {
    const element: HTMLElement = e.relatedTarget as HTMLElement;
    if (this.dropdown.contains(element)) {
      this.dropdown.focus();
    } else {
      this.closedDropdown();
    }
  };
}

export default DropdownDomController;
