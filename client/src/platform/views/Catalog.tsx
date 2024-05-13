import { ProductList } from '../components/ProductList';
import { SideBar } from '../components/SideBar';
import { Layout } from '../../components/Layout';
import { PageTitle } from '../../components/PageTitle';

export function Catalog() {
  /* const activeCategory = categories.find(category => category.id_category === Number(id || null)); */

  return (
    <Layout>
      <PageTitle title="Catálogo" />
      <div className="border-t mx-auto flex flex-col md:flex-row pt-10 mb-20">
        {/* Sidebar */}
        <div className="w-full md:w-1/5">
          <SideBar />
        </div>

        {/* Contenido principal */}
        <div className="flex flex-col w-full">
          <h1 className="text-xl text-left font-semibold mb-4 font-serif tracking-tighter">
            {/* {activeCategory?.category} */}
          </h1>
          <div className="w-full">
            <ProductList />
          </div>
        </div>
      </div>
    </Layout>
  );
}
