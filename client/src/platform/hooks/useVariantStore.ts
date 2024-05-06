import { useAppDispatch, useAppSelector } from '../../hooks/config';
import { ResponseDto } from '../../dtos/ResponseDto';
import { ProductVariant } from '../../store/variant/interfaces/IVariantState';
import { onSetActive } from '../../store/variant/variantSlice';

export function useVariantStore() {
  const { active } = useAppSelector(state => state.variant);
  const dispatch = useAppDispatch();

  async function setActiveVariant(variantUuid: string) {
    try {
      const url = import.meta.env.VITE_API_URL;
      const endpoint = 'product-variants';

      const response = await fetch(`${url}/${endpoint}/${variantUuid}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const variantData: ResponseDto<ProductVariant> = await response.json();
      dispatch(onSetActive(variantData.success ? variantData.data! : ({} as ProductVariant)));
    } catch (error) {
      console.error(error);
    }
  }

  function setVariant(variant: ProductVariant) {
    dispatch(onSetActive(variant));
  }

  return {
    // Propiedades
    active,

    // Métodos
    setVariant,
    setActiveVariant
  };
}
