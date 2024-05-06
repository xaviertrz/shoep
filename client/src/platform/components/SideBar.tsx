import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useCategoryStore } from '../hooks/useCategoryStore';

export function SideBar() {
  const { id } = useParams<{ id: string }>();
  const { categories, fetchCategories } = useCategoryStore();

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="font-light">
      <h2 className="text-lg font-normal text-left text-gray-800 mb-4">Categorías</h2>
      <ul className="list-none">
        {categories.map(category => (
          <li key={category.id_category} className="mb-2">
            <Link
              to={`/categorias/${category.id_category}`}
              className={`flex items-center gap-2 text-black hover:text-gray-500 transition duration-300 tracking-tight ease-in-out normal-case ${category.id_category === Number(id) ? 'font-medium' : ''}`}
            >
              {category.category} <span className="text-gray-500 text-sm">({category.count})</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
