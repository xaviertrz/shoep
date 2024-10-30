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
        <div className="flex flex-col items-center gap-6 justify-center">
          {orders?.map(order => (
            <div key={order.uuid} className="flex flex-col bg-black bg-opacity-5 rounded-lg border-2">
              <div key={order.uuid} className="grid grid-cols-1 md:grid-cols-4 gap-4 w-full text-left">
                <div className="flex flex-col p-4 md:flex-row gap-4 col-span-1 md:col-span-2">
                  <div className="flex flex-col gap-2">
                    <h2 className="font-semibold text-left tracking-tighter">{order.product_variants.products.name}</h2>
                    <img
                      src={order.product_variants.product_images[0].source}
                      alt={order.product_variants.products.name}
                      className="w-32 h-32 justify-center object-contain rounded-lg"
                    />
                  </div>
                  <div>
                    <div className="flex gap-10 text-start font-light mt-4">
                      <div>
                        <h4 className="text-gray-600 text-sm">Características del producto</h4>
                        <div className="flex gap-5 mt-4 justify-between">
                          <div className="text-sm">
                            <div>Color</div>
                            <div>Material</div>
                            <div>Talla</div>
                            <div>UPC</div>
                            <div>SKU</div>
                          </div>

                          <div className="text-right lowercase text-sm font-semibold">
                            <p>{order.product_variants.product_colors.name}</p>
                            <p>{order.product_variants.product_materials.name}</p>
                            <p>{order.product_variants.product_sizes.number}</p>
                            <p>{order.product_variants.sku || 'Sin UPC'}</p>
                            <p>{order.product_variants.upc || 'Sin SKU'}</p>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="text-gray-600 text-sm">Detalles del pedido</h4>
                        <div className="flex justify-between mt-4 gap-6">
                          <div className="text-sm">
                            <p>Cantidad</p>
                            <p>Total</p>
                            <p>Estado</p>
                            <p>Fecha de compra</p>
                          </div>
                          <div className="text-right lowercase text-sm font-semibold">
                            <p>{order.quantity}</p>
                            <p>
                              {order.total.toLocaleString('es-CO', {
                                style: 'currency',
                                currency: 'COP'
                              })}
                            </p>
                            <p className="text-green-600 font-semibold">{order.status === 'approved' && 'Pago'}</p>
                            <p>{new Date(order.paid_at).toLocaleDateString()}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-white col-span-2 grid p-4 grid-cols-2 w-full rounded-r-lg gap-10 text-start font-light pt-8">
                  <div>
                    <h2 className="text-gray-600 text-sm">Detalles del envío</h2>
                    <div className="flex justify-between mt-4 gap-6">
                      <div className="text-sm">
                        <p>Dirección Linea 1</p>
                        <p>Direccion Linea 2</p>
                        <p>Barrio</p>
                        <p>Ciudad</p>
                        <p>Teléfono</p>
                      </div>
                      <div className="text-right text-sm font-semibold">
                        <p>{order.user_addresses.address_line1}</p>
                        <p>{order.user_addresses.address_line2}</p>
                        <p>{order.user_addresses.neighborhood.name}</p>
                        <p>{order.user_addresses.neighborhood.cities.name}</p>
                        <p>{order.user_addresses.phone_number}</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h2 className="text-gray-600 text-sm">
                      Datos del {user?.role_id === roleIds.BUYER ? 'vendedor' : 'comprador'}
                    </h2>
                    <div className="flex justify-between mt-4 gap-6">
                      <div className="text-sm">
                        <p>Nombre</p>
                        <p>Correo</p>
                        <p>Teléfono</p>
                        <p>{user?.role_id === roleIds.BUYER ? 'Nit' : ''}</p>
                      </div>
                      <div className="text-right text-sm font-semibold">
                        {user?.role_id === roleIds.BUYER ? (
                          <>
                            <p>{order.product_variants.products.users?.username}</p>
                            <p>{order.product_variants.products.users?.email}</p>
                            <p>{order.product_variants.products.users?.phone_number}</p>
                            <p>{order.product_variants.products.users?.nit}</p>
                          </>
                        ) : (
                          <>
                            <p>{order.user_addresses.users?.username}</p>
                            <p>{order.user_addresses.users?.email}</p>
                            <p>{order.user_addresses.users?.phone_number}</p>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
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
