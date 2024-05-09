import { useEffect /* useState */ } from 'react';
import { Layout } from '../../components/Layout';
import { useAuthStore } from '../../auth/hooks/useAuthStore';
import { roleIds } from '../../constants/role-ids';
import { ProductDashboard } from '../components/ProductDashboard';
import { ISeller } from '../../interfaces/ISeller';
import { PageTitle } from '../../components/PageTitle';

import { SiMercadopago } from 'react-icons/si';
import { VscLinkExternal } from 'react-icons/vsc';
import { useProductStore } from '../hooks/useProductStore';
import { ENV } from '../../env';

export function MyProducts() {
  const url = ENV.PROD;
  const { user, logout } = useAuthStore() as { user: ISeller; logout: () => void };
  const { fetchProductsBySellerUuid } = useProductStore();
  /*   const [currentPage, setCurrentPage] = useState(1); */
  const redirect_uri = `${url}/mercado_pago_redirect`;
  const mp_auth_uri = `https://auth.mercadopago.com/authorization?client_id=${import.meta.env.VITE_MP_APP_ID}&response_type=code&platform_id=mp&state=${user.uuid}&redirect_uri=${redirect_uri}`;

  useEffect(() => {
    if (user?.role_id !== roleIds.SELLER) logout();
  }, [logout, user]);

  useEffect(() => {
    fetchProductsBySellerUuid(user!.uuid);
  }, []);

  /*   const handlePageChange = (page: number) => {
    setCurrentPage(page); 
  }; */
  /*   console.log(user.mp_access_token);
  console.log(user.mp_refresh_token);
  console.log(user.mp_token_expiration_date); */

  if (!user.mp_access_token) {
    return (
      <Layout>
        <PageTitle title="Mis Productos" />
        <div className="flex flex-col items-center justify-center pt-14 h-full mb-20">
          <h1 className="text-3xl md:text-4xl font-bold font-serif tracking-tighter text-center mb-2 text-gray-800">
            Te falta algo...
          </h1>
          <p className="text-lg md:text-xl font-light text-center mb-8 text-balance tracking-tight">
            Para publicar tus productos, necesitas vincular tu cuenta de Mercado Pago.
          </p>
          <a
            href={mp_auth_uri}
            target="_blank"
            className="bg-blue-500 hover:bg-blue-600 text-white flex items-center gap-2 py-3 px-6 rounded-lg text-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 mb-8"
          >
            <span className="font-light">Vincular cuenta de Mercado Pago</span>
            <VscLinkExternal size={10} className="font-bold" />
          </a>
          <SiMercadopago size={70} />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <PageTitle title="Mis Productos" />

      <div className="w-full pb-24">
        <ProductDashboard />
        {/* <Pagination totalPages={10} onPageChange={handlePageChange} /> */}
      </div>
    </Layout>
  );
}
