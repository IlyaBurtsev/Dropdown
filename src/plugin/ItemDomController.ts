import ChangeStateTypes from '../models/enums/ChangeStateTypes';
import PluginActions from '../models/enums/PluginActions';
import { Item, ItemDomOptions, Payload, RootState } from '../models/types';
import { removeElementsFromDom } from './utils/utils';

class ItemDomController {
  private itemElements: Array<HTMLElement>;
  private item: Item;
  constructor(options: ItemDomOptions) {
    const { onDestroySubscriber, onChangeStateSubscriber, viewConnector} = options;
    const { item } = viewConnector;
    this.item = item;
    this.itemElements = this.initItems(options);
    onChangeStateSubscriber(this.onChangeState);
    onDestroySubscriber(this.onDestroy);
  }

  private initItems = (options: ItemDomOptions): Array<HTMLElement> => {
    const elements: Array<HTMLElement> = [];
    const { numberOfItems } = options;
    const { container, addButtonClassName, subButtonClassName } = this.item;
    elements.push(container);
    const addButton = <HTMLElement>container.querySelector(`.${addButtonClassName}`);
    addButton.setAttribute('id', `${0}`);
    const subButton = <HTMLElement>container.querySelector(`.${subButtonClassName}`);
    subButton.setAttribute('id', `${0}`);
    const fragment = document.createDocumentFragment();
    for (let i = 1; i < numberOfItems; i += 1) {
      const newItem = container.cloneNode(true) as HTMLElement;
      const addButton = <HTMLElement>newItem.querySelector(`.${addButtonClassName}`);
      addButton.setAttribute('id', `${i}`);
      const subButton = <HTMLElement>newItem.querySelector(`.${subButtonClassName}`);
      subButton.setAttribute('id', `${i}`);
      fragment.append(newItem);
      elements.push(newItem);
    }
    container.after(fragment);
    return elements;
  };

  private onChangeState = (state: RootState, payload: Payload): void => {
    const { setValue, setItemName } = this.item;
    const { itemStates } = state;
    const { changeType, id } = payload;

    if (changeType === ChangeStateTypes.init) {
      this.itemElements.forEach((item, index) => {
        setItemName(`${itemStates[index].itemName}`, item);
        setValue(`${itemStates[index].value}`, item);
      });
    } else {
      if (id !== undefined) {
        const item = this.itemElements[id];
        setItemName(`${itemStates[id].itemName}`, item);
        setValue(`${itemStates[id].value}`, item);
      }
    }
  };

  private onDestroy = (): void => {
    removeElementsFromDom(this.itemElements, 1);
  };
}

export default ItemDomController;
