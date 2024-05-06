import { Link, useParams } from 'react-router-dom';
import { useCategoryStore } from '../platform/hooks/useCategoryStore';
import { useEffect } from 'react';
import { useModalStore } from '../platform/hooks/useModalStore';
import { useAuthStore } from '../auth/hooks/useAuthStore';

export function Footer() {
  const { id } = useParams<{ id: string }>();
  const { status } = useAuthStore();
  const { openLoginModal } = useModalStore();
  const { categories, fetchCategories } = useCategoryStore();

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <footer className="flex px-4 lg:px-8 text-sm pb-12">
      <div
        className={`grid  border-t w-full pt-10 pb-5 ${status === 'not-authenticated' ? 'grid-cols-5' : 'grid-cols-4'}`}
      >
        <div className="flex flex-col text-left font-light uppercase">
          <span className="font-normal pb-4">Calzado</span>
          <ul className="flex flex-col gap-3">
            <li>
              <Link to="/catalogo" className="hover:text-gray-500 transition-all duration-200">
                Ver catálogo
              </Link>
            </li>
          </ul>
        </div>
        <div className="flex flex-col col-span-2 text-left font-light uppercase">
          <span className="font-normal pb-4">Categorías</span>
          <ul className="grid grid-cols-2 flex-col gap-3">
            {categories.map(category => {
              return (
                <li key={category.id_category}>
                  <Link
                    to={`/categorias/${category.id_category}`}
                    className={`${category.id_category === Number(id) ? 'font-medium' : ''} hover:text-gray-500 transition-all duration-200`}
                  >
                    {category.category}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
        {status === 'not-authenticated' && (
          <div className="flex flex-col text-left font-light uppercase">
            <span className="font-normal pb-4">Plataforma</span>
            <ul className="flex flex-col gap-3">
              <li>
                <button onClick={openLoginModal} className="hover:text-gray-500 uppercase transition-all duration-200">
                  Iniciar sesión
                </button>
              </li>
              <li>
                <Link to="/registrar" className="hover:text-gray-500 transition-all duration-200">
                  Registrarse
                </Link>
              </li>
            </ul>
          </div>
        )}
        <div className="flex flex-col text-left font-light uppercase">
          <span className="font-normal pb-4">Atención al cliente</span>
          <ul className="flex flex-col gap-3">
            <li>
              <Link to="/" className="hover:text-gray-500 transition-all duration-200">
                Menciones legales
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
