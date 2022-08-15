import PluginActions from '../models/enums/PluginActions';
import { Actions, Item } from '../models/types';
declare class DropdownListener {
    private eventNames;
    private trigger;
    private addButtonClassName;
    private subButtonClassName;
    constructor(dropdown: HTMLElement, defaultItem: Item, getEventNames: () => Actions, trigger: (actions: PluginActions, ...args: Array<Object>) => void);
    private onClickDropdown;
    private detectEvent;
}
export default DropdownListener;
