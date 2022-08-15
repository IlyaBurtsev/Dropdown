import PluginActions from '../models/enums/PluginActions';
import { UserOptions } from '../models/interfaces';
import { Actions, Payload, RootState } from '../models/types';
declare class DataController {
    private numberOfDefaultItems;
    private trigger;
    private options;
    private actions;
    constructor(trigger: (actions: PluginActions, ...args: Array<Object>) => void, userOptions?: UserOptions);
    getActions: () => Actions;
    getNumberOfDefaultItems: () => number;
    autoClose: () => boolean;
    changeState: (state: RootState, payload: Payload) => RootState;
    private updateOptions;
    private setNumberOfDefaultItems;
    private checkState;
    private checkItem;
    initState: () => RootState;
}
export default DataController;
