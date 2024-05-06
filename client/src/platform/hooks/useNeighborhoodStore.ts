import { useAppDispatch, useAppSelector } from '../../hooks/config';
import { ResponseDto } from '../../dtos/ResponseDto';
import { onSetActiveNeighborhood, onSetNeighborhoods } from '../../store/neighborhood/neighborhoodSlice';
import { INeighborhood } from '../../interfaces/INeighborhood';

export function useNeighborhoodStore() {
  const { neighborhoods, active } = useAppSelector(state => state.neighborhood);
  const dispatch = useAppDispatch();

  async function fetchNeighborhoods() {
    try {
      const url = import.meta.env.VITE_API_URL;
      const endpoint = 'neighborhoods';

      const response = await fetch(`${url}/${endpoint}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const neighborhoodsData: ResponseDto<INeighborhood[]> = await response.json();

      dispatch(onSetNeighborhoods(neighborhoodsData.success ? neighborhoodsData.data! : []));
    } catch (error) {
      console.error(error);
    }
  }

  async function setActiveNeighborhood(neighborhood: INeighborhood) {
    dispatch(onSetActiveNeighborhood(neighborhood));
  }

  return {
    // Propiedades
    neighborhoods,
    active,

    // Métodos
    fetchNeighborhoods,
    setActiveNeighborhood
  };
}
