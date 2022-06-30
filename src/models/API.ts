import { ItemParametrs, UserOptions } from './interfaces';
import { Payload, RootState } from './types';

interface API {
  updateDropdownOptions: (options: UserOptions) => void;
  changeTitle: (title: string) => void;
  changeItemParametrs: (parametrs: ItemParametrs, id: number) => void;
  subscribeToChangeState: (handler: (state?: RootState, payload?: Payload) => void, subscribe?: boolean) => void;
}

export default API;
