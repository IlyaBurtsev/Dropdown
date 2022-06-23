import PluginActions from '../models/enums/PluginActions';
import ViewConnector from '../models/ViewConnector';
import DataController from './DataController';
import Observer from './observer/Observer';
import { UserOptions } from '../models/interfaces';
import ChangeStateTypes from '../models/enums/ChangeStateTypes';
import DropdownDomController from './DropdownDomController';
import DefaultItemDomController from './DefaultItemDomController';
import { RootState } from '../models/types';

class Plugin extends Observer {
  private dataController: DataController;
  private dropdownController: DropdownDomController;
  private defaultItemController: DefaultItemDomController;
  private state: RootState;
  constructor(viewConnector: ViewConnector, newOptions?: UserOptions) {
    super();
    this.init(viewConnector, newOptions);
		this.on(PluginActions.onClickAddButton, this.onClickAddButton)
		this.on(PluginActions.onClickSubButton, this.onClickSubButton)
    this.newTrigger(PluginActions.onChangeState, this.state);
  }
  private init(viewConnector: ViewConnector, newOptions?: UserOptions): void {
    this.dataController = new DataController(this.newTrigger ,newOptions);
    this.state = this.dataController.initState();
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
    });
  }

	private onClickAddButton = this.changeStateMethodCreator(ChangeStateTypes.addButtonClicked)

	private onClickSubButton = this.changeStateMethodCreator(ChangeStateTypes.subButtonClicked)

  private newTrigger = (actions: PluginActions, ...args: Array<Object>): void => {
    this.trigger(actions, ...args);
  };

  private getStateSubscriber = (handler: (state?: RootState, id?: number) => void, subscribe = true): void => {
    if (subscribe) {
      this.on(PluginActions.onChangeState, handler);
    } else {
      this.off(PluginActions.onChangeState, handler);
    }
  };

  private addOnDestroySubscriber = (handler: () => void): void => {
    this.on(PluginActions.onDestroy, handler);
  };

  private changeStateMethodCreator(type: ChangeStateTypes): (handlerId?: number) => void {
    return (handlerId?: number): void => {
      let id: number;
      if (handlerId === undefined) {
        id = -1;
      } else {
        id = handlerId;
      }
      this.state = this.dataController.changeState(type, this.state, id);
    };
  }
}

export default Plugin;
