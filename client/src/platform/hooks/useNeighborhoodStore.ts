import { useAppDispatch, useAppSelector } from '../../hooks/config';
import { ResponseDto } from '../../dtos/ResponseDto';
import { onSetActiveNeighborhood, onSetNeighborhoods } from '../../store/neighborhood/neighborhoodSlice';
import { INeighborhood } from '../../interfaces/INeighborhood';
import { ENV } from '../../env';

export function useNeighborhoodStore() {
  const { neighborhoods, active } = useAppSelector(state => state.neighborhood);
  const dispatch = useAppDispatch();
  const url = ENV.PROD;

  async function fetchNeighborhoods() {
    try {
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
