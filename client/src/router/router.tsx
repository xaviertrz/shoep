import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { Auth } from '../auth/views/Auth';
import { Register } from '../auth/views/Register';
import { RegisterSeller } from '../auth/views/RegisterSeller';
import { RegisterBuyer } from '../auth/views/RegisterBuyer';
import { useAuthStore } from '../auth/hooks/useAuthStore';
import { Catalog } from '../platform/views/Catalog';
import { MyProducts } from '../platform/views/MyProducts';
import { NewProduct } from '../platform/views/NewProduct';
import { ProductEditSelection } from '../platform/components/ProductEditSelection';
import { ProductView } from '../platform/views/ProductView';
import { PreCheckout } from '../platform/views/PreCheckout';
import { MyAddresses } from '../platform/views/MyAddresses';
import { NewAddress } from '../platform/views/NewAddress';
import { Home } from '../home/views/Home';
import { SuccessPayment } from '../platform/views/SuccessPayment';
import { FailedPayment } from '../platform/views/FailedPayment';
import { MyOrders } from '../platform/views/MyOrders';
import { Profile } from '../platform/views/Profile';

export const AppRouter = () => {
  const { status, checkAuthToken } = useAuthStore();

  useEffect(() => {
    checkAuthToken();
  }, []);

  if (status === 'checking') {
    return <h1>Cargando...</h1>;
  }

  return (
    <Routes>
      {status === 'authenticated' ? (
        <>
          <Route path="/productos" element={<MyProducts />} />
          <Route path="/pedidos" element={<MyOrders />} />
          <Route path="/domicilios" element={<MyAddresses />} />
          <Route path="/comprar/:variantUuid" element={<PreCheckout />} />
          <Route path="/crear-producto" element={<NewProduct />} />
          <Route path="/agregar-domicilio" element={<NewAddress />} />
          <Route path="/editar-producto/:productUuid" element={<ProductEditSelection />} />
        </>
      ) : (
        <>
          <Route path="/iniciar-sesion" element={<Auth />} />
          <Route path="/registrar" element={<Register />} />
          <Route path="/registrar/comprador" element={<RegisterBuyer />} />
          <Route path="/registrar/vendedor" element={<RegisterSeller />} />
        </>
      )}
      <Route path="/" element={<Home />} />
      <Route path="/perfil/:userUuid" element={<Profile />} />
      <Route path="/catalogo" element={<Catalog />} />
      <Route path="/categorias/:id" element={<Catalog />} />
      <Route path="/productos/:productUuid" element={<ProductView />} />
      <Route path="/pagos/exitoso" element={<SuccessPayment />} />
      <Route path="/pagos/fallido" element={<FailedPayment />} />

      {/* Unknown routes */}
      <Route path="/*" element={<Navigate to="/" />} />
    </Routes>
  );
};
