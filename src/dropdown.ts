import PluginActions from './models/enums/PluginActions';
import ViewConnector from './models/ViewConnector';
import DataController from './plugin/DataController';
import Observer from './plugin/observer/Observer';
import { ItemParametrs, ItemState, UserOptions } from './models/interfaces';
import ChangeStateTypes from './models/enums/ChangeStateTypes';
import DropdownDomController from './plugin/DropdownDomController';
import ItemDomController from './plugin/ItemDomController';
import { Payload, RootState } from './models/types';
import { deepMerge } from './plugin/utils/utils';
import API from './models/API';

class Plugin extends Observer {
  private dataController: DataController;
  private dropdownController: DropdownDomController;
  private defaultItemController: ItemDomController;
  private state: RootState;
  constructor(viewConnector: ViewConnector, newOptions?: UserOptions) {
    super();
    this.init(viewConnector, newOptions);
    this.on(PluginActions.changeState, this.changeState);
    this.on(PluginActions.onDestroy, this.onDestroy);
    this.newTrigger(PluginActions.onChangeState, this.state, { changeType: ChangeStateTypes.init });
  }

  public getState = (): RootState => {
    const { itemStates: defaultStates, title } = this.state;
    const defaultItemsState: Array<ItemState> = [];
    defaultStates.forEach((itemState) => {
      const cloneState = Object.assign(itemState);
      defaultItemsState.push(cloneState);
    });
    return {
      itemStates: defaultItemsState,
      title: title,
    };
  };

  private init(viewConnector: ViewConnector, newOptions?: UserOptions): void {
    this.dataController = new DataController(this.newTrigger, newOptions);

    this.dropdownController = new DropdownDomController({
      autoClose: this.dataController.autoClose(),
      viewConnector: viewConnector,
      getEventNames: this.dataController.getActions,
      trigger: this.newTrigger,
      onChangeStateSubscriber: this.getStateSubscriber,
    });
    this.defaultItemController = new ItemDomController({
      viewConnector: viewConnector,
      numberOfItems: this.dataController.getNumberOfDefaultItems(),
      onDestroySubscriber: this.addOnDestroySubscriber,
      onChangeStateSubscriber: this.getStateSubscriber,
    });
    this.state = this.dataController.initState();
  }

  public closedDropdown = (): void => {
    this.dropdownController.handleClosedDropdown();
  };

  private changeState = (payload: Payload): void => {
    this.state = this.dataController.changeState(this.state, payload);
  };

  private newTrigger = (actions: PluginActions, ...args: Array<Object>): void => {
    this.trigger(actions, ...args);
  };

  private getStateSubscriber = (handler: (state?: RootState, payload?: Payload) => void, subscribe = true): void => {
    if (subscribe) {
      this.on(PluginActions.onChangeState, handler);
    } else {
      this.off(PluginActions.onChangeState, handler);
    }
  };

  private addOnDestroySubscriber = (handler: () => void): void => {
    this.on(PluginActions.onDestroy, handler);
  };

  private onDestroy = (): void => {
    this.removeAllEvents();
  };
}

const createDropdownPlugin = (viewConnector: ViewConnector, options?: UserOptions): API => {
  const view = viewConnector;
  const subscribers: Map<PluginActions, Function> = new Map();
  let userOptions: UserOptions | undefined = options;

  let dropdownPlugin = new Plugin(view, options);

  const updateDropdownOptions = (newUserOptions: UserOptions): void => {
    if (userOptions !== undefined) {
      userOptions = deepMerge(userOptions, true, newUserOptions);
    } else {
      userOptions = newUserOptions;
    }
    dropdownPlugin.trigger(PluginActions.onDestroy);
    dropdownPlugin = new Plugin(view, userOptions);
    subscribers.forEach((hanler, actions) => dropdownPlugin.on(actions, hanler));
  };

  const changeTitle = (title: string): void => {
    const payload: Payload = { changeType: ChangeStateTypes.changeTitle, title: title };
    dropdownPlugin.trigger(PluginActions.changeState, payload);
  };

  const changeItemParametrs = (parametrs: ItemParametrs, id: number): void => {
    const payload: Payload = {
      changeType: ChangeStateTypes.changeItem,
      id: id,
      itemParametrs: parametrs,
    };
    dropdownPlugin.trigger(PluginActions.changeState, payload);
  };

  const getStateSubscriber = (handler: (state?: RootState, payload?: Payload) => void, subscribe = true): void => {
    if (subscribe) {
      dropdownPlugin.on(PluginActions.onChangeState, handler);
      subscribers.set(PluginActions.onChangeState, handler);
    } else {
      dropdownPlugin.off(PluginActions.onChangeState, handler);
    }
  };

  const api: API = {
    updateDropdownOptions: updateDropdownOptions,
    changeTitle: changeTitle,
    changeItemParametrs: changeItemParametrs,
    subscribeToChangeState: getStateSubscriber,
    closedDropdown: dropdownPlugin.closedDropdown,
  };
  return api;
};

const dropdownCreator = {
  createDropdownPlugin,
  ChangeStateTypes,
};

export default dropdownCreator;
