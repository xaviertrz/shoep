import { useAppDispatch, useAppSelector } from '../../hooks/config';
import { ResponseDto } from '../../dtos/ResponseDto';
import { onSetCategories, onSetActive } from '../../store/category/categorySlice';
import { GetAllCategoriesDto } from '../../dtos/CategoryDto';
import { ENV } from '../../env';

export function useCategoryStore() {
  const { categories, active } = useAppSelector(state => state.category);
  const dispatch = useAppDispatch();
  const url = ENV.PROD;

  async function fetchCategories() {
    try {
      const endpoint = 'categories';
      const response = await fetch(`${url}/${endpoint}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const categoriesData: ResponseDto<GetAllCategoriesDto[]> = await response.json();
      dispatch(
        onSetCategories(
          categoriesData.success
            ? categoriesData.data!.sort((a, b) => a.category.toLowerCase().localeCompare(b.category.toLowerCase()))
            : []
        )
      );
    } catch (error) {
      console.error(error);
    }
  }

  async function setActive(id: number) {
    try {
      dispatch(onSetActive(id));
    } catch (error) {
      console.error(error);
    }
  }

  return {
    // Propiedades
    categories,
    active,

    // Métodos
    fetchCategories,
    setActive
  };
}
