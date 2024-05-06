import { INeighborhoodState } from './interfaces/INeighborhoodState';

export const initialState: INeighborhoodState = {
  neighborhoods: [],
  active: {
    id: 0,
    name: '',
    city_id: 0,
    cities: {
      id: 0,
      name: '',
      department_id: 0
    }
  }
};
