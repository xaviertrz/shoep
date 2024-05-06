import React, { useEffect, useState } from 'react';
import { useAuthStore } from '../../auth/hooks/useAuthStore';
import { useNeighborhoodStore } from '../hooks/useNeighborhoodStore';
import { IAddressForm } from '../interfaces/IAddressForm';
import { useAddressStore } from '../hooks/useAddressStore';

export function AddressForm() {
  const { user, logout } = useAuthStore();
  const { neighborhoods, fetchNeighborhoods } = useNeighborhoodStore();
  const { createUserAddress } = useAddressStore();

  useEffect(() => {
    if (!user) {
      logout();
    }
  }, [logout, user]);

  useEffect(() => {
    fetchNeighborhoods();
  }, []);

  const [addressData, setAddressData] = useState<IAddressForm>({
    user_uuid: user!.uuid,
    address_line1: '',
    address_line2: '',
    neighborhood_id: 0,
    phone_number: 0
  });

  function handleChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value } = event.target;
    setAddressData({
      ...addressData,
      [name]: value
    });
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    createUserAddress(addressData);
  }

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="bg-gray-100 rounded-md p-6 shadow-lg">
        <h3 className="text-xl font-semibold mb-4">Datos de la Dirección</h3>
        <div className="grid grid-cols-1 gap-6">
          <div>
            <label htmlFor="address_line1" className="block mb-1">
              Dirección Línea 1:
            </label>
            <input
              type="text"
              id="address_line1"
              name="address_line1"
              value={addressData.address_line1}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="address_line2" className="block mb-1">
              Dirección Línea 2:
            </label>
            <input
              type="text"
              id="address_line2"
              name="address_line2"
              value={addressData.address_line2 || ''}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="neighborhood_id" className="block mb-1">
              Barrio:
            </label>
            <select
              id="neighborhood_id"
              name="neighborhood_id"
              value={addressData.neighborhood_id.toString()}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
              required
            >
              <option value="">Seleccionar Barrio</option>
              {neighborhoods.map(neighborhood => (
                <option key={neighborhood.id} value={neighborhood.id}>
                  {neighborhood.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="phone_number" className="block mb-1">
              Teléfono:
            </label>
            <input
              type="text"
              id="phone_number"
              name="phone_number"
              value={addressData.phone_number}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
              required
            />
          </div>
        </div>
        <button
          type="submit"
          className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none"
        >
          Guardar Dirección
        </button>
      </div>
    </form>
  );
}
