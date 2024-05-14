import { GetAllMaterialsDto } from '../../dtos/GetAllMaterialsDto';
import { ResponseDto } from '../../dtos/ResponseDto';
import { ENV } from '../../env';
import { useAppDispatch, useAppSelector } from '../../hooks/config';
import { onSetMaterials } from '../../store/material/materialSlice';

export function useMaterialStore() {
  const { materials } = useAppSelector(state => state.material);
  const dispatch = useAppDispatch();
  const url = ENV.PROD;

  async function fetchMaterials() {
    try {
      const endpoint = 'materials';
      const response = await fetch(`${url}/${endpoint}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const materialsData: ResponseDto<GetAllMaterialsDto[]> = await response.json();
      dispatch(
        onSetMaterials(
          materialsData.success
            ? materialsData.data!.sort((a, b) =>
                a.material_name.toLowerCase().localeCompare(b.material_name.toLowerCase())
              )
            : []
        )
      );
      return materialsData;
    } catch (error) {
      console.error(error);
    }
  }

  return {
    // Propiedades
    materials,

    // Métodos
    fetchMaterials
  };
}
