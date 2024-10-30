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
import { ENV } from '../../env';
import { useNavigate } from 'react-router-dom';

export function useProductStore() {
  const { closeAddVariantModal, closeEditProductModal } = useModalStore();
  const { products, active, activeVariant } = useAppSelector(state => state.product);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const url = ENV.PROD;

  async function fetchProductsByCategoryId(categoryId: number) {
    try {
      const endpoint = 'products';
      const filter = 'by-category';

      const response = await fetch(`${url}/${endpoint}/${filter}/${categoryId}`, {
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

  async function fetchProductsByMaterialId(materialId: number) {
    try {
      const endpoint = 'products';
      const filter = 'by-material';

      const response = await fetch(`${url}/${endpoint}/${filter}/${materialId}`, {
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

  async function fetchProductsBySizeId(sizeId: number) {
    try {
      const endpoint = 'products';
      const filter = 'by-size';

      const response = await fetch(`${url}/${endpoint}/${filter}/${sizeId}`, {
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

  async function fetchProductsByColorId(colorId: number) {
    try {
      const endpoint = 'products';
      const filter = 'by-color';

      const response = await fetch(`${url}/${endpoint}/${filter}/${colorId}`, {
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
      const endpoint = 'products';
      const filter = 'by-uuid';

      const response = await fetch(`${url}/${endpoint}/${filter}/${productUuid}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const product: ResponseDto<IProduct> = await response.json();

      if (product.success) {
        dispatch(onSetActive(product.data!));
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function fetchProductsBySellerUuid(sellerUuid: string) {
    try {
      const endpoint = 'products';
      const filter = 'by-seller-uuid';

      const response = await fetch(`${url}/${endpoint}/${filter}/${sellerUuid}`, {
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
        return;
      }

      Swal.fire('Error', productData.message, 'error');
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
          console.log(imagesData.data!);
          dispatch(onSetActive(imagesData.success ? imagesData.data! : ({} as IProduct)));
          closeAddVariantModal();
        }
      } else {
        Swal.fire('Error', variantData.message, 'error');
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function editProduct(productFormData: IEditProductForm) {
    try {
      const endpoint = 'products';
      const response = await fetch(`${url}/${endpoint}/${productFormData.uuid}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-token': localStorage.getItem('token')!
        },
        body: JSON.stringify(productFormData)
      });
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

  async function blockProduct(product_uuid: string) {
    try {
      const endpoint = 'products';
      const action = 'block';
      const response = await fetch(`${url}/${endpoint}/${action}/${product_uuid}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'x-token': localStorage.getItem('token')!
        }
      });
      const blockResponse: ResponseDto<void> = await response.json();
      if (blockResponse.success) {
        Swal.fire('Producto bloqueado', blockResponse.message, 'success');
        navigate(-1);
        closeEditProductModal();
      } else {
        Swal.fire('Error', blockResponse.message, 'error');
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function deleteVariant(variantUuid: string) {
    try {
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

      const endpoint = 'variant-images';
      const response = await fetch(`${url}/${endpoint}`, {
        method: 'POST',
        body: formData
      });
      const imagesData: ResponseDto<IProduct> = await response.json();
      if (imagesData.success) {
        Swal.fire('Imágenes subidas', 'Se subieron las imágenes del producto', 'success');
        dispatch(onSetActive(imagesData.success ? imagesData.data! : ({} as IProduct)));
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
      const endpoint = 'variant-images';
      const response = await fetch(`${url}/${endpoint}/${imageId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data: ResponseDto<IProduct> = await response.json();
      if (data.success) {
        Swal.fire('Imagen eliminada', 'Se elimino la imagen del producto', 'success');
        const newImages = activeVariant.product_images.filter(image => image.id !== imageId);

        dispatch(
          onSetActiveVariant({
            ...activeVariant,
            product_images: newImages
          })
        );

        dispatch(onSetActive(data.data!));
      } else {
        Swal.fire('Error eliminando imagen', data.message, 'error');
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function fetchImagesByVariantUuid(variantUuid: string) {
    try {
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

  async function setProducts(products: IProduct[]) {
    try {
      dispatch(onSetProducts(products));
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
    setProducts,
    cleanList,
    uploadImages,
    deleteImage,
    setActiveVariant,
    createProduct,
    createVariant,
    editProduct,
    editVariant,
    deleteVariant,
    blockProduct,
    fetchProductsByCategoryId,
    fetchProductsByMaterialId,
    fetchProductsBySizeId,
    fetchProductsByColorId,
    fetchProductByUuid,
    fetchProductsBySellerUuid,
    fetchImagesByVariantUuid,
    setActive
  };
}
