import './example.scss';
import './style/style.scss';
import './style/fonts.scss';
import './components/dropdown/dropdown.ts';
import Plugin from '../src/plugin/Plugin';
import ViewConnector from '../src/models/ViewConnector';
import initDropdown from './components/dropdown/dropdown';

const element = <HTMLElement>document.querySelector('.custom-dropdown');
const view: ViewConnector = initDropdown(element);
const dropdown: Plugin = new Plugin(view, {
  itemNames: ['kjlh', 'kjohhu', 'kkkkkkk'],
  titlePlaceholder: 'title',
  maxValueItem: 5,
	minValueItem:-2
});
