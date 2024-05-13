import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';

import { AiOutlineClose } from 'react-icons/ai';
import { IoSaveSharp } from 'react-icons/io5';

import { useModalStore } from '../hooks/useModalStore';
import { useNeighborhoodStore } from '../hooks/useNeighborhoodStore';
import { useAddressStore } from '../hooks/useAddressStore';
import { AddressDto } from '../../dtos/AddressDto';
import { useAuthStore } from '../../auth/hooks/useAuthStore';

Modal.setAppElement('#root');

export function EditAddressModal() {
  const { closeEditAddressModal, isEditAddressModalOpen } = useModalStore();
  const { user } = useAuthStore();
  const { active, editUserAddress } = useAddressStore();
  const { neighborhoods, fetchNeighborhoods } = useNeighborhoodStore();
  const [addressForm, setAddressForm] = useState<AddressDto>({
    id: 0,
    user_uuid: user!.uuid,
    address_line1: '',
    address_line2: '',
    neighborhood_id: 0,
    phone_number: 0,
    neighborhood: {
      id: 0,
      name: '',
      city_id: 0
    }
  });

  useEffect(() => {
    if (active) {
      setAddressForm(active);
    }
  }, [active]);

  useEffect(() => {
    fetchNeighborhoods();
  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Aquí puedes enviar o guardar los datos actualizados de la dirección
    editUserAddress(addressForm);
  };

  return (
    <Modal
      isOpen={isEditAddressModalOpen}
      onRequestClose={closeEditAddressModal}
      className="sticky top-0 w-4/5 flex-col p-8 text-left border rounded-lg bg-white"
      overlayClassName="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-30"
      closeTimeoutMS={50}
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div className="flex justify-between items-center gap-4">
          <div className="flex gap-4 items-center">
            <h2 className="text-xl sm:text-2xl  leading-relaxed font-bold text-gray-800">Editando domicilio</h2>
            <button
              type="submit"
              className="p-1.5 border border-gray-300 rounded-lg hover:bg-gray-100 transition duration-300 ease-in-out"
            >
              <IoSaveSharp size={20} className="text-gray-800" />
            </button>
          </div>
          <button type="button" onClick={closeEditAddressModal}>
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
            className="border border-gray-300 rounded-md px-3 py-2 w-full"
            value={addressForm?.address_line1}
            onChange={e => setAddressForm({ ...addressForm, address_line1: e.target.value })}
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
            className="border border-gray-300 rounded-md px-3 py-2 w-full"
            value={addressForm.address_line2 || ''}
            onChange={e => setAddressForm({ ...addressForm, address_line2: e.target.value })}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-center">
          <div className="flex flex-col">
            <label htmlFor="neighborhood_id" className="font-light text-gray-500 text-sm uppercase mb-1">
              Barrio *
            </label>
            <select
              id="neighborhood_id"
              name="neighborhood_id"
              value={addressForm.neighborhood_id}
              onChange={e => setAddressForm({ ...addressForm, neighborhood_id: Number(e.target.value) })}
              className="border border-gray-300 rounded-md px-3 py-2 w-full"
              required
            >
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
              className="border border-gray-300 rounded-md px-3 py-2 w-full"
              value={addressForm.phone_number}
              onChange={e => setAddressForm({ ...addressForm, phone_number: Number(e.target.value) })}
              required
            />
          </div>
        </div>
      </form>
    </Modal>
  );
}

export default EditAddressModal;
