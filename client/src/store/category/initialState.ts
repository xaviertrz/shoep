import { ICategoryState } from './interfaces/ICategoryState';

export const initialState: ICategoryState = {
  categories: [],
  active: {
    id_category: 0,
    category: '',
    count: 0
  }
};
