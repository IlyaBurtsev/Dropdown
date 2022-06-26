import { ItemDefaultParametrs, UserOptions } from './interfaces';
import { Payload, RootState } from './types';

interface API {
  updateDropdownOptions: (options: UserOptions) => void;
  changeTitle: (title: string) => void;
  changeDefaulItemParametrs: (parametrs: ItemDefaultParametrs, id: number) => void;
}

export default API;
