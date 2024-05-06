import { useAppDispatch, useAppSelector } from '../../hooks/config';
import { ResponseDto } from '../../dtos/ResponseDto';
import { onSetColors, onSetMaterials, onSetSizes } from '../../store/product-options/productOptionsSlice';
import { IMaterial } from '../../interfaces/IMaterial';
import { IColor } from '../../interfaces/IColor';
import { ISize } from '../../interfaces/ISize';
import { useCategoryStore } from './useCategoryStore';

export function useProductOptionsStore() {
  const { fetchCategories } = useCategoryStore();
  const { colors, materials, sizes } = useAppSelector(state => state.productOptions);
  const dispatch = useAppDispatch();

  async function fetchProductOptions() {
    try {
      const url = import.meta.env.VITE_API_URL;
      const materialsEndpoint = 'materials';
      const colorsEndpoint = 'colors';
      const sizesEndpoint = 'sizes';

      const [materialsResponse, colorsResponse, sizesResponse] = await Promise.all([
        fetch(`${url}/${materialsEndpoint}`),
        fetch(`${url}/${colorsEndpoint}`),
        fetch(`${url}/${sizesEndpoint}`),
        fetchCategories()
      ]);

      const materialsData: ResponseDto<IMaterial[]> = await materialsResponse.json();
      const colorsData: ResponseDto<IColor[]> = await colorsResponse.json();
      const sizesData: ResponseDto<ISize[]> = await sizesResponse.json();

      dispatch(onSetMaterials(materialsData.success ? materialsData.data! : []));
      dispatch(onSetColors(colorsData.success ? colorsData.data! : []));
      dispatch(onSetSizes(sizesData.success ? sizesData.data! : []));
    } catch (error) {
      console.error(error);
    }
  }

  return {
    // Propiedades
    colors,
    materials,
    sizes,

    // Métodos
    fetchProductOptions
  };
}
