import { useEffect, useState } from 'react';
import { IProductForm } from '../interfaces/IProductForm';
import { useAuthStore } from '../../auth/hooks/useAuthStore';
import { useProductOptionsStore } from '../hooks/useProductOptionsStore';
import { useCategoryStore } from '../hooks/useCategoryStore';
import { useProductStore } from '../hooks/useProductStore';

export function ProductForm() {
  const { user, logout } = useAuthStore();
  const { categories } = useCategoryStore();
  const { createProduct } = useProductStore();
  const { colors, materials, sizes, fetchProductOptions } = useProductOptionsStore();

  useEffect(() => {
    if (!user) {
      logout();
    }
  }, [logout, user]);

  useEffect(() => {
    fetchProductOptions();
  }, []);

  const [productData, setProductData] = useState<IProductForm>({
    category_id: 0,
    seller_uuid: user!.uuid,
    name: '',
    brand: '',
    description: null,
    variant: {
      size_id: 0,
      material_id: 0,
      color_id: 0,
      upc: null,
      sku: null,
      stock: 0,
      price: 0,
      images: []
    }
  });

  function handleChange(event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = event.target;
    setProductData({
      ...productData,
      [name]: value
    });
  }

  function handleVariantChange(event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) {
    const { name, value } = event.target;
    setProductData({
      ...productData,
      variant: {
        ...productData.variant,
        [name]: value
      }
    });
  }

  function handleImageUpload(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.files) {
      const imagesArray: File[] = Array.from(event.target.files);
      if (imagesArray.length < 1 || imagesArray.length > 5) {
        event.target.value = '';
        alert('El rango de imágenes permitidas es de 1 a 5.');
        return;
      }

      setProductData({
        ...productData,
        variant: {
          ...productData.variant,
          images: imagesArray
        }
      });
    }
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    createProduct(productData);
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-8 tracking-tight mt-10 pb-24">
      <div className="sticky top-0 w-2/5 flex-col text-left border-r rounded-lg h-fit pr-10">
        <h3 className="text-xl sm:text-2xl leading-relaxed font-bold text-gray-800 mb-6">Datos del producto</h3>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col col-span-2">
            <label htmlFor="name" className="font-light text-gray-500 text-sm uppercase">
              Nombre *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={productData.name}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-3 py-2 w-full"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label htmlFor="brand" className="font-light text-gray-500 text-sm uppercase">
                Marca *
              </label>
              <input
                type="text"
                id="brand"
                name="brand"
                value={productData.brand}
                onChange={handleChange}
                className="border border-gray-300 rounded-md px-3 py-2 w-full"
                required
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="category_id" className="font-light text-gray-500 text-sm uppercase">
                Categoría *
              </label>
              <select
                id="category_id"
                name="category_id"
                value={productData.category_id}
                onChange={handleChange}
                className="border border-gray-300 rounded-md px-3 py-2 w-full"
                required
              >
                <option value="">Seleccionar Categoría</option>
                {categories.map((category, index) => (
                  <option key={index} value={category.id_category}>
                    {category.category}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex flex-col col-span-2">
            <label htmlFor="description" className="font-light text-gray-500 text-sm uppercase">
              Descripción
            </label>
            <textarea
              id="description"
              name="description"
              value={productData.description || ''}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-3 py-2 w-full h-32 resize-none"
            />
          </div>
        </div>
      </div>

      <div className="flex w-3/5 flex-col text-left">
        <h3 className="text-xl sm:text-2xl leading-relaxed font-bold text-gray-800 mb-6">Datos de la variante</h3>

        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-3 gap-5">
            <div className="flex flex-col">
              <label htmlFor="size_id" className="font-light text-gray-500 text-sm uppercase">
                Tamaño *
              </label>
              <select
                id="size_id"
                name="size_id"
                value={productData.variant.size_id}
                onChange={handleVariantChange}
                className="border border-gray-300 rounded-md px-3 py-2 w-full"
              >
                <option value="">Selecciona una talla</option>
                {sizes.map((size, index) => (
                  <option key={index} value={size.id}>
                    {size.number} <span className="font-light text-sm text-gray-500">({size.centimeters} cm)</span>
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col">
              <label htmlFor="material_id" className="font-light text-gray-500 text-sm uppercase">
                Material *
              </label>
              <select
                id="material_id"
                name="material_id"
                value={productData.variant.material_id}
                onChange={handleVariantChange}
                className="border border-gray-300 rounded-md px-3 py-2 w-full"
              >
                <option value="">Selecciona un material</option>
                {materials.map((material, index) => (
                  <option key={index} value={material.id}>
                    {material.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col">
              <label htmlFor="color_id" className="font-light text-gray-500 text-sm uppercase">
                Color *
              </label>
              <select
                id="color_id"
                name="color_id"
                value={productData.variant.color_id}
                onChange={handleVariantChange}
                className="border border-gray-300 rounded-md px-3 py-2 w-full"
              >
                <option value="">Selecciona un color</option>
                {colors.map((color, index) => (
                  <option key={index} value={color.id}>
                    {color.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-5">
            <div className="flex flex-col">
              <label htmlFor="upc" className="font-light text-gray-500 text-sm uppercase">
                UPC
              </label>
              <input
                type="number"
                id="upc"
                name="upc"
                value={productData.variant.upc || 0}
                onChange={handleVariantChange}
                className="border border-gray-300 rounded-md px-3 py-2 w-full"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="sku" className="font-light text-gray-500 text-sm uppercase">
                SKU
              </label>
              <input
                type="text"
                id="sku"
                name="sku"
                value={productData.variant.sku || ''}
                onChange={handleVariantChange}
                className="border border-gray-300 rounded-md px-3 py-2 w-full"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-5">
            <div className="flex flex-col">
              <label htmlFor="stock" className="font-light text-gray-500 text-sm uppercase">
                Stock *
              </label>
              <input
                type="number"
                id="stock"
                name="stock"
                value={productData.variant.stock}
                onChange={handleVariantChange}
                className="border border-gray-300 rounded-md px-3 py-2 w-full"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="price" className="font-light text-gray-500 text-sm uppercase">
                Precio *
              </label>
              <input
                type="number"
                id="price"
                name="price"
                value={productData.variant.price}
                onChange={handleVariantChange}
                className="border border-gray-300 rounded-md px-3 py-2 w-full"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-5 items-center">
            <div>
              <label htmlFor="images" className="font-light text-gray-500 text-sm uppercase">
                Imágenes
              </label>
              <input
                type="file"
                id="images"
                name="images"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
                required
              />
              <p className="text-sm mt-2">Rango de imágenes permitidas: mínimo 1, máximo 5.</p>
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-600 transition duration-300 ease-in-out"
            >
              Agregar producto
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
