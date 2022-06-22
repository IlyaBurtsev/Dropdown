import { DefaultItem, DefaultItemDomOptions, RootState } from '../models/types';
import { removeElementsFromDom } from './utils/utils';

class DefaultItemDomController {
  private itemElements: Array<HTMLElement>;
  private defaultItem: DefaultItem;
  constructor(options: DefaultItemDomOptions) {
    const { onDestroySubscriber, onChangeStateSubscriber, viewConnector } = options;
    const { defaultItem: defaulItem } = viewConnector;
    this.itemElements = this.initItems(options);
    this.defaultItem = defaulItem;
    onChangeStateSubscriber(this.onChangeState);
    onDestroySubscriber(this.onDestroy);
  }

  private initItems = (options: DefaultItemDomOptions): Array<HTMLElement> => {
    const elements: Array<HTMLElement> = [];
    const { numberOfItems } = options;
    const { container, addButtonClassName, subButtonClassName } = this.defaultItem;
    elements.push(container);
    const addButton = <HTMLElement>container.querySelector(`.${addButtonClassName}`);
    addButton.setAttribute('id', `${0}`);
    const subButton = <HTMLElement>container.querySelector(`.${subButtonClassName}`);
    subButton.setAttribute('id', `${0}`);
    const fragment = document.createDocumentFragment();
    for (let i = 1; i < numberOfItems; i += 1) {
      const newDefaultItem = container.cloneNode(true) as HTMLElement;
      const addButton = <HTMLElement>newDefaultItem.querySelector(`.${addButtonClassName}`);
      addButton.setAttribute('id', `${i}`);
      const subButton = <HTMLElement>newDefaultItem.querySelector(`.${subButtonClassName}`);
      subButton.setAttribute('id', `${i}`);
      fragment.append(newDefaultItem);
      elements.push(newDefaultItem);
    }
    container.after(fragment);
    return elements;
  };

  private onChangeState = (state: RootState, id: number): void => {
    const { setValue, setItemName } = this.defaultItem;
    const { defaultStates } = state;
    if (id === -1) {
      this.itemElements.forEach((item, index) => {
        setItemName(`${defaultStates[index].itemName}`, item);
        setValue(`${defaultStates[index].value}`, item);
      });
    } else {
      const item = this.itemElements[id];
      setValue(`${defaultStates[id].value}`, item);
    }
  };

  private onDestroy = (): void => {
    removeElementsFromDom(this.itemElements, 1);
  };
}

export default DefaultItemDomController;
