import { useEffect, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import Modal from 'react-modal';

import { useNeighborhoodStore } from '../hooks/useNeighborhoodStore';
import { useAddressStore } from '../hooks/useAddressStore';
import { useAuthStore } from '../../auth/hooks/useAuthStore';
import { IAddressForm } from '../interfaces/IAddressForm';
import { useModalStore } from '../hooks/useModalStore';
Modal.setAppElement('#root');

export function AddAddressModal() {
  const { user, logout } = useAuthStore();
  const { isAddAddressModalOpen, closeAddAddressModal } = useModalStore();
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
    <Modal
      isOpen={isAddAddressModalOpen}
      onRequestClose={closeAddAddressModal}
      className="sticky top-0 w-4/5 md:w-2/5 flex-col p-8 text-left border rounded-lg bg-white"
      overlayClassName="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-30"
      closeTimeoutMS={50}
    >
      <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
        <div className="flex justify-between items-center gap-4">
          <div className="flex gap-4 items-center">
            <h2 className="text-xl sm:text-2xl  leading-relaxed font-bold text-gray-800">Agregando domicilio</h2>
          </div>

          <button type="button" onClick={closeAddAddressModal}>
            <AiOutlineClose size={20} className="text-gray-900 hover:text-gray-500 transition-all duration-200" />
          </button>
        </div>

        <div className="flex flex-col">
          <label htmlFor="address_line1" className="font-light text-gray-500 text-sm uppercase mb-1">
            Dirección *
          </label>
          <input
            type="text"
            id="address_line1"
            name="address_line1"
            value={addressData.address_line1}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-3 py-2 w-full"
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="address_line2" className="font-light text-gray-500 text-sm uppercase mb-1">
            Especificaciones
          </label>
          <input
            type="text"
            id="address_line2"
            name="address_line2"
            value={addressData.address_line2 || ''}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-3 py-2 w-full"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="flex flex-col">
            <label htmlFor="neighborhood_id" className="font-light text-gray-500 text-sm uppercase mb-1">
              Barrio *
            </label>
            <select
              id="neighborhood_id"
              name="neighborhood_id"
              value={addressData.neighborhood_id.toString()}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-3 py-2 w-full"
              required
            >
              <option value="">Selecciona un barrio</option>
              {neighborhoods.map(neighborhood => (
                <option key={neighborhood.id} value={neighborhood.id}>
                  {neighborhood.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col">
            <label htmlFor="phone_number" className="font-light text-gray-500 text-sm uppercase mb-1">
              Teléfono *
            </label>
            <input
              type="text"
              id="phone_number"
              name="phone_number"
              value={addressData.phone_number}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-3 py-2 w-full"
              required
            />
          </div>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-600 transition duration-300 ease-in-out mt-4 ml-auto"
        >
          Agregar domicilio
        </button>
      </form>
    </Modal>
  );
}
