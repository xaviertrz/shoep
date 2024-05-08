import { useAppDispatch, useAppSelector } from '../../hooks/config';
import { ResponseDto } from '../../dtos/ResponseDto';
import { IAddress } from '../../interfaces/IAddress';
import { onSetActive, onSetAddresses } from '../../store/addresses/addressSlice';
import { IAddressForm } from '../interfaces/IAddressForm';
import { AddressDto } from '../../dtos/AddressDto';
import { onCloseAddAddressModal, onCloseEditAddressModal } from '../../store/modal/modalSlice';
import { ENV } from '../../env';
import Swal from 'sweetalert2';

export function useAddressStore() {
  const { addresses, active } = useAppSelector(state => state.address);
  const dispatch = useAppDispatch();
  const url = ENV.PROD;

  async function fetchAddressesByUserId(userUuid: string) {
    try {
      const endpoint = 'user-addresses';
      const filter = 'by-user-uuid';
      const response = await fetch(`${url}/${endpoint}/${filter}/${userUuid}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-token': localStorage.getItem('token')!
        }
      });
      const addressesData: ResponseDto<AddressDto[]> = await response.json();
      dispatch(onSetAddresses(addressesData.success ? addressesData.data! : []));
    } catch (error) {
      console.error(error);
    }
  }

  async function createUserAddress(addressFormData: IAddressForm) {
    try {
      addressFormData = {
        ...addressFormData,
        neighborhood_id: Number(addressFormData.neighborhood_id),
        phone_number: Number(addressFormData.phone_number)
      };

      const endpoint = 'user-addresses';
      const response = await fetch(`${url}/${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-token': localStorage.getItem('token')!
        },
        body: JSON.stringify(addressFormData)
      });
      const addressData: ResponseDto<IAddress> = await response.json();
      if (addressData.success) {
        Swal.fire('Dirección creada', addressData.message, 'success');
        dispatch(onCloseAddAddressModal());
      } else {
        Swal.fire('Error creando dirección', addressData.message, 'error');
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function editUserAddress(addressFormData: AddressDto) {
    try {
      const toSendData = {
        id: addressFormData.id,
        user_uuid: addressFormData.user_uuid,
        address_line1: addressFormData.address_line1,
        address_line2: addressFormData.address_line2,
        neighborhood_id: Number(addressFormData.neighborhood_id),
        phone_number: Number(addressFormData.phone_number)
      };

      const endpoint = 'user-addresses';
      const response = await fetch(`${url}/${endpoint}/${toSendData.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-token': localStorage.getItem('token')!
        },
        body: JSON.stringify(toSendData)
      });
      const addressData: ResponseDto<AddressDto[]> = await response.json();
      if (addressData.success) {
        Swal.fire('Dirección actualizada', addressData.message, 'success');
        dispatch(onSetAddresses(addressData.data!));
        dispatch(onCloseEditAddressModal());
      } else {
        Swal.fire('Error actualizando dirección', addressData.message, 'error');
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function deleteUserAddress(addressId: number) {
    try {
      const endpoint = 'user-addresses';
      const response = await fetch(`${url}/${endpoint}/${addressId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'x-token': localStorage.getItem('token')!
        }
      });
      const addressData: ResponseDto<AddressDto[]> = await response.json();
      if (addressData.success) {
        Swal.fire('Dirección eliminada', addressData.message, 'success');
        dispatch(onSetAddresses(addressData.data!));
      } else {
        Swal.fire('Error eliminando dirección', addressData.message, 'error');
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function setActive(addressData: AddressDto) {
    try {
      dispatch(onSetActive(addressData));
    } catch (error) {
      console.error(error);
    }
  }

  return {
    // Propiedades
    addresses,
    active,

    // Métodos
    createUserAddress,
    editUserAddress,
    deleteUserAddress,
    fetchAddressesByUserId,
    setActive
  };
}
