import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { GoPersonFill } from 'react-icons/go';
import { FaPhoneAlt } from 'react-icons/fa';
import { MdOutlineAlternateEmail } from 'react-icons/md';
import { FaLocationDot } from 'react-icons/fa6';

import { Layout } from '../../components/Layout';
import { useAuthStore } from '../../auth/hooks/useAuthStore';
import { useVariantStore } from '../hooks/useVariantStore';
import { useAddressStore } from '../hooks/useAddressStore';
import { PageTitle } from '../../components/PageTitle';
import { usePaymentStore } from '../hooks/usePaymentStore';
import { roleIds } from '../../constants/role-ids';
import Swal from 'sweetalert2';
import { useQuantityStore } from '../hooks/useQuantityStore';

export function PreCheckout() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { generatePreference } = usePaymentStore();
  const { variantUuid } = useParams<{ variantUuid: string }>();
  const { active, setActiveVariant } = useVariantStore();
  const { fetchAddressesByUserId, addresses } = useAddressStore();
  const { quantity } = useQuantityStore();
  const [selectedAddress, setSelectedAddress] = useState<string>('');

  const [checkoutPrice, setCheckoutPrice] = useState<number>(0);

  useEffect(() => {
    if (active) {
      setCheckoutPrice(active.price * quantity);
    }
  }, [active, quantity]);

  useEffect(() => {
    if (quantity === 0) {
      Swal.fire('Error', 'La cantidad de productos debe ser mayor a 0', 'error');
      navigate(-1);
    }
  }, [quantity]);

  useEffect(() => {
    if (user?.role_id === roleIds.SELLER) {
      navigate(-1);
    }
  }, [navigate, user?.role_id]);

  useEffect(() => {
    if (variantUuid) {
      setActiveVariant(variantUuid);
    }
    fetchAddressesByUserId(user!.uuid);
  }, []);

  useEffect(() => {
    fetchAddressesByUserId(user!.uuid);
  }, []);

  // Manejar cambio de dirección seleccionada
  const handleAddressChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedAddress(event.target.value);
  };

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!selectedAddress) {
      Swal.fire('Error', 'Debes seleccionar una dirección de entrega', 'error');
      return;
    }

    const response = await generatePreference({
      address_id: Number(selectedAddress),
      variant_uuid: active.uuid,
      user_uuid: user!.uuid,
      quantity
    });

    if (response!.success) {
      window.location.href = response!.data ?? '';
    }
  }

  return (
    <Layout>
      <PageTitle title="Comprando" />

      <div className="flex flex-col lg:flex-row gap-10 pb-16">
        {/* Columna 2: Datos del Producto */}
        <div className="w-full lg:w-2/3">
          <div className="w-full">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th scope="col" className="py-4 text-left text-xs font-medium text-gray-500 uppercase ">
                    Producto
                  </th>
                  <th scope="col" className="py-4 px-2 text-left text-xs font-medium text-gray-500 uppercase">
                    Precio
                  </th>
                  <th scope="col" className="py-4 px-2 text-left text-xs font-medium text-gray-500 uppercase">
                    Cantidad
                  </th>
                  <th scope="col" className="py-4 px-2 text-left text-xs font-medium text-gray-500 uppercase">
                    Subtotal
                  </th>
                </tr>
              </thead>
              <tbody className="text-left bg-white divide-y divide-gray-200">
                <tr>
                  <td className="py-4 whitespace-nowrap w-full">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        <img
                          className="rounded-md object-cover h-24 w-24"
                          src={active.product_images?.[0]?.source}
                          alt=""
                        />
                      </div>
                      <div className="ml-4 text-left">
                        <h1 className="text-lg font-light text-gray-900 mb-4">{active.products.name}</h1>
                        <div className="text-sm text-gray-500">
                          <p className="font-bold">
                            Talla:{' '}
                            <span className="text-base font-normal">
                              {active.product_sizes.number}{' '}
                              <span className="text-sm font-light text-gray-600">
                                ({active.product_sizes.centimeters} cm)
                              </span>
                            </span>
                          </p>
                          <p className="font-bold">
                            Color: <span className="text-base font-normal">{active.product_colors.name}</span>
                          </p>
                          <p className="font-bold">
                            Material: <span className="text-base font-normal">{active.product_materials.name}</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-2 whitespace-nowrap text-gray-500">${active.price.toLocaleString('es-CO')}</td>
                  <td className="py-4 px-2 whitespace-nowrap text-sm text-gray-500">{quantity}</td>
                  <td className="py-4 px-2 whitespace-nowrap text-gray-500">
                    ${checkoutPrice.toLocaleString('es-CO')}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        {/* Columna 1: Datos del Comprador */}
        <div className="w-full lg:w-1/3 p-4 rounded-md bg-gray-100">
          <div className="pb-4 border-b border-gray-400 text-left flex justify-between">
            <h2 className="text-xl font-light">Factura</h2>
            <h2 className="font-serif font-bold text-xl tracking-tighter lowercase underline decoration underline-offset-4">
              Shoep.
            </h2>
          </div>
          <div className="pt-2 text-left">
            <h3 className=" font-medium mb-2">Comprador</h3>
            <div className="text-gray-700 flex gap-2 items-center mb-1">
              <GoPersonFill />
              <span>{user?.username}</span>
            </div>
            <div className="text-gray-700 flex gap-2 items-center mb-1">
              <FaPhoneAlt />
              <span>{user?.phone_number?.toString()}</span>
            </div>
            <div className="text-gray-700 flex gap-2 items-center">
              <MdOutlineAlternateEmail />
              <span>{user?.email}</span>
            </div>
          </div>
          {/* Input para seleccionar dirección */}
          <form className="mt-4 pt-2 border-t border-gray-400" onSubmit={handleSubmit}>
            <label htmlFor="address" className="flex gap-2 items-center text-gray-700 mb-2">
              <FaLocationDot />
              <span>Dirección de entrega</span>
            </label>
            <select
              id="address"
              name="address"
              value={selectedAddress}
              onChange={handleAddressChange}
              className="w-full border p-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring-blue-500"
              required
            >
              <option value="">Selecciona un domicilio</option>
              {addresses.map(address => (
                <option key={address.id} value={address.id}>
                  {address.address_line1}, {address.neighborhood.name}
                </option>
              ))}
            </select>
            <Link to="/domicilios" className="text-blue-500 text-right text-sm block mt-2">
              Agregar domicilio
            </Link>
            <div className="mt-4 pt-2 border-t border-gray-400 text-left flex items-center justify-between">
              <p className="font-base text-lg font-semibold">Total</p>
              <span className="uppercase font-medium text-xl">
                <span className="font-light text-xs mr-2">COP</span>${checkoutPrice.toLocaleString('es-CO')}
              </span>
            </div>
            <button
              type="submit"
              className={`w-full   text-white font-bold py-2 px-4 rounded mt-4 transition-all duration-200 ${!selectedAddress ? 'bg-blue-400 hover:cursor-not-allowed hover:bg-blue-400' : 'bg-blue-500 hover:bg-blue-700'}`}
            >
              Pagar con Mercado Pago
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
}
