import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useCategoryStore } from '../hooks/useCategoryStore';
import { useProductOptionsStore } from '../hooks/useProductOptionsStore';

export function SideBar() {
  const { id } = useParams<{ id: string }>();

  const { pathname } = window.location;
  const endpoint = pathname.split('/')[1];

  const { categories, fetchCategories } = useCategoryStore();
  const { colors, materials, sizes, fetchProductOptions } = useProductOptionsStore();

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchProductOptions();
  }, []);

  return (
    <div className="font-light h-96 no-over md:overflow-y-auto">
      <h2 className="text-xs font-medium text-left text-gray-800 uppercase mb-4">Filtrar por</h2>
      <ul className="list-none pl-4 border-l mb-10">
        <h2 className="text-xs font-medium text-left text-gray-800 uppercase mb-2">Categorías</h2>
        <div className="flex flex-row md:flex-col md:gap-0 gap-4 overflow-x-auto">
          {categories.map(category => (
            <li key={category.id_category} className="mb-2 ">
              <Link
                to={`/categorias/${category.id_category}`}
                className={`flex items-center md:gap-2 gap-0.5 text-black hover:text-gray-500 transition duration-300 tracking-tight ease-in-out normal-case ${category.id_category === Number(id) && endpoint === 'categorias' ? 'font-medium' : ''}`}
              >
                {category.category} <span className="text-gray-500 text-sm">({category.count})</span>
              </Link>
            </li>
          ))}
        </div>
      </ul>

      <ul className="list-none pl-4 border-l mb-10">
        <h2 className="text-xs font-medium text-left text-gray-800 uppercase mb-2">Materiales</h2>
        <div className="flex flex-row md:flex-col md:gap-0 gap-4 overflow-x-auto">
          {materials.map(material => (
            <li key={material.material_id} className="mb-2">
              <Link
                to={`/materiales/${material.material_id}`}
                className={`flex items-center md:gap-2 gap-0.5 text-black hover:text-gray-500 transition duration-300 tracking-tight ease-in-out normal-case ${material.material_id === Number(id) && endpoint === 'materiales' ? 'font-medium' : ''}`}
              >
                {material.material_name} <span className="text-gray-500 text-sm">({material.product_count})</span>
              </Link>
            </li>
          ))}
        </div>
      </ul>

      <ul className="list-none pl-4 border-l mb-10">
        <h2 className="text-xs font-medium text-left text-gray-800 uppercase mb-2">Tallas</h2>
        <div className="flex flex-row md:flex-col md:gap-0 gap-4 overflow-x-auto">
          {sizes.map(size => (
            <li key={size.size_id} className="mb-2">
              <Link
                to={`/tallas/${size.size_id}`}
                className={`flex items-center md:gap-2 gap-0.5 text-black hover:text-gray-500 transition duration-300 tracking-tight ease-in-out normal-case ${size.size_id === Number(id) && endpoint === 'tallas' ? 'font-medium' : ''}`}
              >
                {size.size_number} <span className="text-gray-500 text-sm">({size.product_count})</span>
              </Link>
            </li>
          ))}
        </div>
      </ul>

      <ul className="list-none pl-4 border-l">
        <h2 className="text-xs font-medium text-left text-gray-800 uppercase mb-2">Colores</h2>
        <div className="flex flex-row md:flex-col md:gap-0 gap-4 overflow-x-auto">
          {colors.map(color => (
            <li key={color.color_id} className="mb-2">
              <Link
                to={`/colores/${color.color_id}`}
                className={`flex items-center md:gap-2 gap-0.5 text-black hover:text-gray-500 transition duration-300 tracking-tight ease-in-out normal-case ${color.color_id === Number(id) && endpoint === 'colores' ? 'font-medium' : ''}`}
              >
                {color.color_name} <span className="text-gray-500 text-sm">({color.product_count})</span>
              </Link>
            </li>
          ))}
        </div>
      </ul>
    </div>
  );
}
