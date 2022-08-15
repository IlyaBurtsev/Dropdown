import ViewConnector from './models/ViewConnector';
import { UserOptions } from './models/interfaces';
import ChangeStateTypes from './models/enums/ChangeStateTypes';
import API from './models/API';
declare const dropdownCreator: {
    createDropdownPlugin: (viewConnector: ViewConnector, options?: UserOptions) => API;
    ChangeStateTypes: typeof ChangeStateTypes;
};
export default dropdownCreator;
