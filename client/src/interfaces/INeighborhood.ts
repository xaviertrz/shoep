export interface INeighborhood {
  id: number;
  city_id: number;
  name: string;
  cities: {
    id: number;
    department_id: number;
    name: string;
  };
}
