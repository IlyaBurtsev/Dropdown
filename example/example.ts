import './example.scss';
import './style/style.scss';
import './style/fonts.scss';
import './components/dropdown/dropdown.ts';
import ViewConnector from '../src/models/ViewConnector';
import { initDropdown, switchButtonToActive, switchButtonToDisable } from './components/dropdown/dropdown';
import createDropdownPlugin from '../src/plugin/Plugin';
import { RootState } from '../src/models/types';
import { ItemDefaultParametrs } from '../src/models/interfaces';

const element = <HTMLElement>document.querySelector('.custom-dropdown');
const view: ViewConnector = initDropdown(element);
const { dropdown } = view;

const checkState = (state: RootState, id: number): RootState => {
  const { defaultStates } = state;
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
  itemNames: ['kjlh', 'jklk'],
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

const param: ItemDefaultParametrs = {
  maxValue: 7,
  itemName: 'XXX',
};
const onChangeState = (state: RootState):void => {
const {defaultStates} = state
console.log(defaultStates)
}
plugin.changeDefaulItemParametrs(param, 1);
param.itemName = 'YYY';
param.value = 0;
param.minValue = -1;
plugin.changeDefaulItemParametrs(param, 2);
plugin.onChangeState(onChangeState)