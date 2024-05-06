import { useEffect } from 'react';
import { MdAddHomeWork } from 'react-icons/md';

import { BiSolidEditAlt } from 'react-icons/bi';
import { MdDeleteForever } from 'react-icons/md';
import { FaPhoneAlt } from 'react-icons/fa';

import { Layout } from '../../components/Layout';
import { useAddressStore } from '../hooks/useAddressStore';

import { useAuthStore } from '../../auth/hooks/useAuthStore';
import { EditAddressModal } from '../components/EditAddressModal';
import { useModalStore } from '../hooks/useModalStore';
import { AddressDto } from '../../dtos/AddressDto';
import { PageTitle } from '../../components/PageTitle';
import { AddAddressModal } from '../components/AddAddressModal';

export function MyAddresses() {
  const { user } = useAuthStore();
  const { addresses, fetchAddressesByUserId, deleteUserAddress, setActive } = useAddressStore();
  const { openEditAddressModal, openAddAddressModal } = useModalStore();

  useEffect(() => {
    fetchAddressesByUserId(user!.uuid);
  }, []);

  function openEditModal(address: AddressDto) {
    setActive(address);
    openEditAddressModal();
  }

  return (
    <Layout>
      <PageTitle title="Mis domicilios" />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-16 pt-10">
        <button
          onClick={() => openAddAddressModal()}
          className="flex flex-col rounded-lg items-center p-10 gap-4 bg-black bg-opacity-5"
        >
          <span className="font-light text-xl">Agregar dirección</span>
          <MdAddHomeWork className="text-6xl text-black bg-white rounded-full p-2" />
        </button>
        {addresses.map(address => (
          <div key={address.id} className="bg-white border rounded-lg p-6 text-left">
            <h5 className="text-lg font-bold tracking-tight">{address.address_line1}</h5>
            <p className="text-gray-700 mb-2 font-light text-sm ">{address.address_line2}</p>
            <p className="text-gray-700 mb-2 font-light">{address.neighborhood.name}</p>
            <div className="text-gray-700 mb-2 font-light flex items-center gap-2">
              <FaPhoneAlt />
              <span>{address.phone_number}</span>
            </div>
            <div className="flex gap-2 items-end justify-end">
              <button
                onClick={() => openEditModal(address)}
                className="p-1.5 border-2 border-gray-200 rounded-lg hover:bg-gray-100 transition duration-300 ease-in-out"
              >
                <BiSolidEditAlt size={20} />
              </button>
              <button
                onClick={() => deleteUserAddress(address.id)}
                className="p-1.5 border bg-red-500 text-white border-red-400 rounded-lg hover:bg-red-600 transition duration-300 ease-in-out"
              >
                <MdDeleteForever size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <AddAddressModal />
      <EditAddressModal />
    </Layout>
  );
}
