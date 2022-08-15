import { DropdownDomOptions } from '../models/types';
declare class DropdownDomController {
    private dropdownListener;
    private dropdown;
    private setValueToInput;
    private onChangeStateSubscriber;
    private openDropdown;
    private closedDropdown;
    constructor(options: DropdownDomOptions);
    handleClosedDropdown: () => void;
    private onChangeState;
    private onFocus;
    private onBlur;
}
export default DropdownDomController;
