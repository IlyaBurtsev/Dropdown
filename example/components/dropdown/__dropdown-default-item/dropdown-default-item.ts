import './dropdown-default-item.scss';
const initDefaultItem = (bindElement: HTMLElement): DefaultItem => {
  const className = {
    defaultItemContainer: 'js-dropdown-item__container',
		title: 'js-dropdown-item__title',
    counter: 'js-dropdown-item__counter',
    addButton: 'js-dropdown-item__add-button',
    subButton: 'js-dropdown-item__sub-button',
  };

  const container = <HTMLElement>bindElement.querySelector(`.${className.defaultItemContainer}`);
  if (container === null) {
    throw new Error('Default item container is null!');
  }

  const setValue = (value: string, parentElement: HTMLElement): void => {
    const counter = <HTMLInputElement>parentElement.querySelector(`.${className.counter}`);
    if (counter !== null) {
      counter.value = value;
    }
  };

  const setItemName = (name: string, parentElement: HTMLElement): void => {
		const title = <HTMLInputElement>parentElement.querySelector(`.${className.title}`);
    if (title !== null) {
      title.innerHTML = name;
    }
	};
  return {
    container: container,
    addButtonClassName: className.addButton,
    subButtonClassName: className.subButton,
    setValue: setValue,
    setItemName: setItemName,
  };
};

export default initDefaultItem;
