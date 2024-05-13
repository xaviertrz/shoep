import { useEffect } from 'react';
import { useAuthStore } from '../../auth/hooks/useAuthStore';
import { Layout } from '../../components/Layout';
import { PageTitle } from '../../components/PageTitle';
import { useOrderStore } from '../hooks/useOrderStore';
import { roleIds } from '../../constants/role-ids';

export function MyOrders() {
  const { user } = useAuthStore();
  const { orders, fetchOrdersByBuyerUuid, fetchOrdersBySellerUuid } = useOrderStore();

  useEffect(() => {
    if (user && user.role_id === roleIds.BUYER) {
      fetchOrdersByBuyerUuid(user.uuid);
    }

    if (user && user.role_id === roleIds.SELLER) {
      fetchOrdersBySellerUuid(user.uuid);
    }
  }, []);

  return (
    <Layout>
      <PageTitle title="Mis pedidos" />
      {orders?.length > 0 ? (
        <div className="flex flex-col items-center justify-center">
          {orders?.map(order => (
            <div
              key={order.uuid}
              className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full px-4 py-8 text-left border-b-2"
            >
              <div className="flex gap-4">
                <img
                  src={order.product_variants.product_images[0].source}
                  alt={order.product_variants.products.name}
                  className="w-32 h-32 object-cover rounded-lg"
                />
                <div>
                  <h2 className="text-lg font-semibold tracking-tight">{order.product_variants.products.name}</h2>
                  <p className="font-light">Cantidad: {order.quantity}</p>
                  <p className="font-light">Total: ${order.total}</p>
                  <p className="font-light">Estado: {order.status}</p>
                  <p className="font-light">Fecha de compra: {new Date(order.paid_at).toLocaleDateString()}</p>
                </div>
              </div>
              <div>
                <h2 className="text-lg font-semibold tracking-tight">Dirección de envío</h2>
                <p className="font-light">{order.user_addresses.address_line1}</p>
                <p className="font-light">{order.user_addresses.address_line2}</p>
                <p className="font-light">{order.user_addresses.neighborhood.name}</p>
                <p className="font-light">{order.user_addresses.neighborhood.cities.name}</p>
                <p className="font-light">{order.user_addresses.phone_number}</p>
              </div>
              <div>
                <h2 className="text-lg font-semibold tracking-tight">
                  Datos del {user?.role_id === roleIds.BUYER ? 'vendedor' : 'comprador'}
                </h2>
                {user?.role_id === roleIds.BUYER ? (
                  <>
                    <p className="font-light">{order.product_variants.products.users?.username}</p>
                    <p className="font-light">{order.product_variants.products.users?.email}</p>
                    <p className="font-light">{order.product_variants.products.users?.phone_number}</p>
                    <p className="font-light">{order.product_variants.products.users?.nit}</p>
                  </>
                ) : (
                  <>
                    <p className="font-light">{order.user_addresses.users?.username}</p>
                    <p className="font-light">{order.user_addresses.users?.email}</p>
                    <p className="font-light">{order.user_addresses.users?.phone_number}</p>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col mt-8 h-screen">
          {user?.role_id === roleIds.BUYER ? (
            <p className="text-gray-500 text-lg text-left">No has realizado ningún pedido.</p>
          ) : (
            <p className="text-gray-500 text-lg text-left">No has recibido ningún pedido.</p>
          )}
        </div>
      )}
    </Layout>
  );
}
