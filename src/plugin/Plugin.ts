import PluginActions from '../models/enums/PluginActions';
import ViewConnector from '../models/ViewConnector';
import DataController from './DataController';
import Observer from './observer/Observer';
import { ItemDefaultParametrs, ItemDefaultState, UserOptions } from '../models/interfaces';
import ChangeStateTypes from '../models/enums/ChangeStateTypes';
import DropdownDomController from './DropdownDomController';
import DefaultItemDomController from './DefaultItemDomController';
import { Payload, RootState } from '../models/types';
import { deepMerge } from './utils/utils';
import API from '../models/API';

class Plugin extends Observer {
  private dataController: DataController;
  private dropdownController: DropdownDomController;
  private defaultItemController: DefaultItemDomController;
  private state: RootState;
  constructor(viewConnector: ViewConnector, newOptions?: UserOptions) {
    super();
    this.init(viewConnector, newOptions);
    this.on(PluginActions.onClickAddButton, this.onClickAddButton);
    this.on(PluginActions.onClickSubButton, this.onClickSubButton);
    this.on(PluginActions.onChangeTitle, this.onChangeTitle);
    this.on(PluginActions.onChangeDefaultItemParametrs, this.onChangeDefaultItem);
    this.on(PluginActions.onDestroy, this.onDestroy);
    this.newTrigger(PluginActions.onChangeState, this.state, { init: true });
  }

  public getState = (): RootState => {
    const { defaultStates, title } = this.state;
    const defaultItemsState: Array<ItemDefaultState> = [];
    defaultStates.forEach((itemState) => {
      const cloneState = Object.assign(itemState);
      defaultItemsState.push(cloneState);
    });
    return {
      defaultStates: defaultItemsState,
      title: title,
    };
  };
  private init(viewConnector: ViewConnector, newOptions?: UserOptions): void {
    this.dataController = new DataController(this.newTrigger, newOptions);

    this.dropdownController = new DropdownDomController({
      viewConnector: viewConnector,
      getEventNames: this.dataController.getActions,
      trigger: this.newTrigger,
      onChangeStateSubscriber: this.getStateSubscriber,
    });
    this.defaultItemController = new DefaultItemDomController({
      viewConnector: viewConnector,
      numberOfItems: this.dataController.getNumberOfDefaultItems(),
      onDestroySubscriber: this.addOnDestroySubscriber,
      onChangeStateSubscriber: this.getStateSubscriber,
      trigger: this.newTrigger,
    });
		this.state = this.dataController.initState();
  }

  private onClickAddButton = this.changeStateMethodCreator(ChangeStateTypes.addButtonClicked);

  private onClickSubButton = this.changeStateMethodCreator(ChangeStateTypes.subButtonClicked);

  private onChangeTitle = this.changeStateMethodCreator(ChangeStateTypes.changeTitle);

  private onChangeDefaultItem = this.changeStateMethodCreator(ChangeStateTypes.changeDefaultItem);

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

  private changeStateMethodCreator(type: ChangeStateTypes): (payload: Payload) => void {
    return (payload): void => {
      this.state = this.dataController.changeState(type, this.state, payload);
    };
  }

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
    const payload: Payload = { title: title };
    dropdownPlugin.trigger(PluginActions.onChangeTitle, payload);
  };

  const changeDefaulItemParametrs = (parametrs: ItemDefaultParametrs, id: number, ): void => {
    const payload: Payload = { id: id, defaultItemParametrs: parametrs };
    dropdownPlugin.trigger(PluginActions.onChangeDefaultItemParametrs, payload);
  };

  const api: API = {
    updateDropdownOptions: updateDropdownOptions,
    changeTitle: changeTitle,
    changeDefaulItemParametrs: changeDefaulItemParametrs,
  };
  return api;
};

export default createDropdownPlugin;
