import { useAppDispatch, useAppSelector } from '../../hooks/config';
import { IProduct } from '../../interfaces/IProduct';
import { onSetProducts, onSetActive, onSetActiveVariant, onSetActiveImages } from '../../store/product/productSlice';
import { ResponseDto } from '../../dtos/ResponseDto';
import { IProductForm } from '../interfaces/IProductForm';
import { IProductVariant } from '../../interfaces/IProductVariant';
import { IEditProductForm } from '../interfaces/IEditProductForm';
import { IEditVariantForm } from '../interfaces/IEditVariantForm';
import { IAddVariantForm } from '../interfaces/IAddVariantForm';
import { IProductImage } from '../../interfaces/IProductImage';
import { onCloseEditVariantModal, onCloseImageManagerModal } from '../../store/modal/modalSlice';
import { useModalStore } from './useModalStore';
import Swal from 'sweetalert2';

export function useProductStore() {
  const { products, active, activeVariant } = useAppSelector(state => state.product);
  const dispatch = useAppDispatch();
  const { closeAddVariantModal, closeEditProductModal } = useModalStore();

  async function fetchProductsByCategoryId(categoryId: number, page: number) {
    try {
      const url = import.meta.env.VITE_API_URL;
      const endpoint = 'products';
      const filter = 'by-category';

      const response = await fetch(`${url}/${endpoint}/${filter}/${categoryId}?page=${page}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const productsData: ResponseDto<IProduct[]> = await response.json();
      dispatch(onSetProducts(productsData.success ? productsData.data! : []));
    } catch (error) {
      console.error(error);
    }
  }

  async function fetchProductByUuid(productUuid: string) {
    try {
      const url = import.meta.env.VITE_API_URL;
      const endpoint = 'products';
      const filter = 'by-uuid';

      const response = await fetch(`${url}/${endpoint}/${filter}/${productUuid}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const product: ResponseDto<IProduct> = await response.json();
      dispatch(onSetActive(product.success ? product.data! : ({} as IProduct)));
    } catch (error) {
      console.error(error);
    }
  }

  async function fetchProductsBySellerUuid(sellerUuid: string, page: number = 1) {
    try {
      const url = import.meta.env.VITE_API_URL;
      const endpoint = 'products';
      const filter = 'by-seller-uuid';

      const response = await fetch(`${url}/${endpoint}/${filter}/${sellerUuid}?page=${page}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const productsData: ResponseDto<IProduct[]> = await response.json();
      dispatch(onSetProducts(productsData.success ? productsData.data! : []));
    } catch (error) {
      console.error(error);
    }
  }

  async function createProduct(productFormData: IProductForm) {
    try {
      const formData = new FormData();
      productFormData.variant.images.forEach(image => {
        formData.append('images', image);
      });

      productFormData = {
        ...productFormData,
        category_id: Number(productFormData.category_id),
        variant: {
          ...productFormData.variant,
          size_id: Number(productFormData.variant.size_id),
          material_id: Number(productFormData.variant.material_id),
          color_id: Number(productFormData.variant.color_id),
          upc: Number(productFormData.variant.upc),
          stock: Number(productFormData.variant.stock),
          price: Number(productFormData.variant.price)
        }
      };

      const url = import.meta.env.VITE_API_URL;
      const endpoint = 'products';
      const response = await fetch(`${url}/${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-token': localStorage.getItem('token')!
        },
        body: JSON.stringify(productFormData)
      });
      const productData: ResponseDto<IProduct> = await response.json();
      if (productData.success) {
        formData.append('variant_uuid', productData.data!.uuid);
        /* const imageData: ResponseDto<any> =  */ await postImages(formData);
        Swal.fire('Producto creado', productData.message, 'success');
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function createVariant(variantFormData: IAddVariantForm) {
    try {
      const formData = new FormData();
      variantFormData.images.forEach(image => {
        formData.append('images', image);
      });

      variantFormData = {
        ...variantFormData,
        size_id: Number(variantFormData.size_id),
        material_id: Number(variantFormData.material_id),
        color_id: Number(variantFormData.color_id),
        upc: variantFormData.upc ? Number(variantFormData.upc) : null,
        stock: Number(variantFormData.stock),
        price: Number(variantFormData.price)
      };

      const url = import.meta.env.VITE_API_URL;
      const endpoint = 'product-variants';
      const response = await fetch(`${url}/${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-token': localStorage.getItem('token')!
        },
        body: JSON.stringify(variantFormData)
      });
      const variantData: ResponseDto<IProduct> = await response.json();
      if (variantData.success) {
        Swal.fire('Variante creada', variantData.message, 'success');
        formData.append('variant_uuid', variantData.data!.uuid);
        const imagesData: ResponseDto<IProduct> = await postImages(formData);
        if (imagesData.success) {
          dispatch(onSetActive(imagesData.data!));
          closeAddVariantModal();
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function editProduct(productFormData: IEditProductForm) {
    try {
      const url = import.meta.env.VITE_API_URL;
      const endpoint = 'products';
      const response = await fetch(`${url}/${endpoint}/${productFormData.uuid}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-token': localStorage.getItem('token')!
        },
        body: JSON.stringify(productFormData)
      });
      console.log(localStorage.getItem('token')!);
      const productData: ResponseDto<IProduct> = await response.json();
      if (productData.success) {
        Swal.fire('Producto actualizado', productData.message, 'success');
        dispatch(onSetActive(productData.data!));
        closeEditProductModal();
      } else {
        Swal.fire('Error', productData.message, 'error');
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function editVariant(variantFormData: IEditVariantForm) {
    try {
      const url = import.meta.env.VITE_API_URL;
      const endpoint = 'product-variants';
      const response = await fetch(`${url}/${endpoint}/${variantFormData.uuid}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-token': localStorage.getItem('token')!
        },
        body: JSON.stringify(variantFormData)
      });
      const productData: ResponseDto<IProduct> = await response.json();
      if (productData.success) {
        Swal.fire('Variante actualizada', productData.message, 'success');
        dispatch(onSetActive(productData.data!));
        dispatch(onCloseEditVariantModal());
      } else {
        Swal.fire('Error', productData.message, 'error');
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function deleteVariant(variantUuid: string) {
    try {
      const url = import.meta.env.VITE_API_URL;
      const endpoint = 'product-variants';
      const response = await fetch(`${url}/${endpoint}/${variantUuid}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'x-token': localStorage.getItem('token')!
        }
      });
      const productData: ResponseDto<IProduct> = await response.json();
      if (productData.success) {
        Swal.fire('Variante eliminada', productData.message, 'success');
        dispatch(onSetActive(productData.data!));
      } else {
        Swal.fire('Error', productData.message, 'error');
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function postImages(imageFormData: FormData) {
    try {
      const url = import.meta.env.VITE_API_URL;
      const endpoint = 'variant-images';
      const response = await fetch(`${url}/${endpoint}`, {
        method: 'POST',
        body: imageFormData
      });
      return await response.json();
    } catch (error) {
      console.error(error);
    }
  }

  async function uploadImages(formImageData: File[], variantUuid: string) {
    try {
      // Crea un nuevo FormData
      const formData = new FormData();
      formData.append('variant_uuid', variantUuid);
      // Agrega las imágenes al FormData
      formImageData.forEach(image => {
        formData.append('images', image);
      });
      // Llama a la función para subir las imágenes

      const url = import.meta.env.VITE_API_URL;
      const endpoint = 'variant-images';
      const response = await fetch(`${url}/${endpoint}`, {
        method: 'POST',
        body: formData
      });
      const imagesData: ResponseDto<unknown> = await response.json();
      if (imagesData.success) {
        Swal.fire('Imágenes subidas', 'Se subieron las imágenes del producto', 'success');
        dispatch(onCloseImageManagerModal());
      } else {
        Swal.fire('Error subiendo imágenes', imagesData.message, 'error');
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function deleteImage(imageId: number) {
    try {
      const url = import.meta.env.VITE_API_URL;
      const endpoint = 'variant-images';
      const response = await fetch(`${url}/${endpoint}/${imageId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data: ResponseDto<unknown> = await response.json();
      if (data.success) {
        Swal.fire('Imagen eliminada', 'Se elimino la imagen del producto', 'success');
        const newImages = activeVariant.product_images.filter(image => image.id !== imageId);

        dispatch(
          onSetActiveVariant({
            ...activeVariant,
            product_images: newImages
          })
        );
      } else {
        Swal.fire('Error eliminando imagen', data.message, 'error');
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function fetchImagesByVariantUuid(variantUuid: string) {
    try {
      const url = import.meta.env.VITE_API_URL;
      const endpoint = 'variant-images';
      const filter = 'by-variant-uuid';

      const response = await fetch(`${url}/${endpoint}/${filter}/${variantUuid}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const images: ResponseDto<IProductImage[]> = await response.json();
      dispatch(onSetActiveImages(images.success ? images.data! : []));
    } catch (error) {
      console.error(error);
    }
  }

  async function cleanList() {
    try {
      dispatch(onSetProducts([]));
    } catch (error) {
      console.error(error);
    }
  }

  async function setActive(product: IProduct) {
    try {
      dispatch(onSetActive(product));
    } catch (error) {
      console.error(error);
    }
  }

  async function setActiveVariant(variant: IProductVariant) {
    try {
      dispatch(onSetActiveVariant(variant));
    } catch (error) {
      console.error(error);
    }
  }

  return {
    // Propiedades
    products,
    active,
    activeVariant,

    // Métodos
    cleanList,
    uploadImages,
    deleteImage,
    setActiveVariant,
    createProduct,
    createVariant,
    editProduct,
    editVariant,
    deleteVariant,
    fetchProductsByCategoryId,
    fetchProductByUuid,
    fetchProductsBySellerUuid,
    fetchImagesByVariantUuid,
    setActive
  };
}
