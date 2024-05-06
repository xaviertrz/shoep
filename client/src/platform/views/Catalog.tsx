import { useParams } from 'react-router-dom';
import { ProductList } from '../components/ProductList';
import { SideBar } from '../components/SideBar';
import { useCategoryStore } from '../hooks/useCategoryStore';
import { Layout } from '../../components/Layout';
import { PageTitle } from '../../components/PageTitle';

export function Catalog() {
  const { id } = useParams<{ id: string }>();
  const { categories } = useCategoryStore();
  const activeCategory = categories.find(category => category.id_category === Number(id || null));

  return (
    <Layout>
      <PageTitle title="Catálogo" />
      <div className="container border-t mx-auto flex pt-10 mb-20">
        {/* Sidebar */}
        <div className="w-1/4">
          <SideBar />
        </div>

        {/* Contenido principal */}
        <div className="flex flex-col w-full">
          <h1 className="text-xl text-left font-semibold mb-4 font-serif tracking-tighter">
            {activeCategory?.category}
          </h1>
          <div className="w-full">
            <ProductList />
          </div>
        </div>
      </div>
    </Layout>
  );
}
