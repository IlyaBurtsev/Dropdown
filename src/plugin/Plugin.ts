import PluginActions from '../models/enums/PluginActions';
import ViewConnector from '../models/ViewConnector';
import DataController from './DataController';
import Observer from './observer/Observer';
import { UserOptions } from '../models/interfaces';
import ChangeStateTypes from '../models/enums/ChangeStateTypes';

class Plugin extends Observer {
  private dataController: DataController;
  constructor(viewConnector: ViewConnector, newOptions?: UserOptions) {
    super();
    this.init(viewConnector, newOptions);
  }
  private init(viewConnector: ViewConnector, newOptions?: UserOptions): void {
    this.dataController = new DataController(newOptions);
  }

  private newTrigger = (actions: PluginActions, ...args: Array<Object>): void => {
    this.trigger(actions, ...args);
  };

	private addOnDestroySubscriber = (handler: () => void): void => {
    this.on(PluginActions.onDestroy, handler);
  };

	private changeStateMethodCreator(type: ChangeStateTypes): (newUserPosition: number, handlerId?: number) => void {
    return (newUserPosition: number, handlerId?: number): void => {
      let id: number;
      if (handlerId === undefined) {
        id = -1;
      } else {
        id = handlerId;
      }
      // this.state = this.dataController.changeState(type, this.state, newUserPosition, id);
    };
  }
}
