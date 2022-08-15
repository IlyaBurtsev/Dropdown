import './example.scss';
import './style/style.scss';
import './style/fonts.scss';
import './components/dropdown/dropdown.ts';
import ViewConnector from '../src/models/ViewConnector';
import { initDropdown, switchButtonToActive, switchButtonToDisable } from './components/dropdown/dropdown';
import createDropdownPlugin from '../src/dropdown';
import { Payload, RootState } from '../src/models/types';
import { ItemParametrs } from '../src/models/interfaces';

const element = <HTMLElement>document.querySelector('.custom-dropdown');
const view: ViewConnector = initDropdown(element);
const { dropdown } = view;
const btn =  <HTMLElement>document.querySelector('.test');

const checkState = (state: RootState, id: number, changeStateType: string): RootState => {
  const { itemStates: defaultStates } = state;
  const currentItem = defaultStates[id];
  const { minValue, maxValue, value } = currentItem;
  if (value === minValue) {
    switchButtonToDisable(dropdown, id, false);
  } else {
    switchButtonToActive(dropdown, id, false);
  }
  if (value === maxValue) {
    switchButtonToDisable(dropdown, id, true);
  } else {
    switchButtonToActive(dropdown, id, true);
  }
  return state;
};

const plugin = createDropdownPlugin(view, {
  itemNames: ['kjlh'],
  titlePlaceholder: 'title',
  maxValueItem: 5,
  minValueItem: -2,
  externalCheckState: checkState,
});

plugin.updateDropdownOptions({
  itemNames: ['first', 'second', 'lhluhgu'],
  titlePlaceholder: 'hello',
  minValueItem: 0,
  startValues: 5,
});

plugin.changeTitle('new');

const param: ItemParametrs = {
  maxValue: 7,
  itemName: 'XXX',
};
const onChangeState = (state: RootState, payload: Payload): void => {
  console.log(payload.changeType);
};
plugin.subscribeToChangeState(onChangeState);
plugin.changeItemParametrs(param, 1);
param.itemName = 'YYY';
param.value = 0;
param.minValue = -2;
param.maxValue = 8
param.incrementStep = 2
plugin.changeItemParametrs(param, 2);


