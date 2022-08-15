import ViewConnector from './models/ViewConnector';
import { UserOptions } from './models/interfaces';
import API from './models/API';
declare const createDropdownPlugin: (viewConnector: ViewConnector, options?: UserOptions) => API;
export default createDropdownPlugin;
