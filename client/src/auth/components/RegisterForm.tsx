import React, { useState } from 'react';
import { roleIds } from '../../constants/role-ids';
import { IBuyerForm } from '../interfaces/IBuyerForm';
import { ISellerForm } from '../interfaces/ISellerForm';
import { useAuthStore } from '../hooks/useAuthStore';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { IAdminForm } from '../interfaces/IAdminForm';

export function RegisterForm({ type }: { type: number }) {
  const { registerBuyer, registerSeller, registerAdmin } = useAuthStore();
  const [registerData, setRegisterData] = useState<IBuyerForm | ISellerForm | IAdminForm>({
    name: '',
    lastname: '',
    email: '',
    key: '',
    password: '',
    confirm_password: '',
    nit: 0,
    phone_number: 0
  });

  const [isTermsAndConditionsChecked, setIsTermsAndConditionsChecked] = useState<boolean>(false);

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (registerData.password !== registerData.confirm_password) {
      Swal.fire('Error', 'Las contraseñas no coinciden', 'error');
      return;
    }

    if (type === roleIds.BUYER) {
      registerBuyer(registerData as IBuyerForm);
    }

    if (type === roleIds.SELLER) {
      registerSeller(registerData as ISellerForm);
    }

    if (type === roleIds.ADMIN) {
      registerAdmin(registerData as IAdminForm);
    }
  }

  return (
    <form onSubmit={onSubmit} className="text-left w-full md:w-3/5 mx-auto font-light mb-20 p-8 rounded-2xl border">
      {type === roleIds.SELLER && (
        <div className="mb-4">
          <label htmlFor="nit" className="block text-sm text-gray-700">
            NIT
          </label>
          <input
            onChange={event => setRegisterData({ ...registerData, nit: Number(event.target.value) })}
            placeholder="NIT"
            name="nit"
            className="mt-1 p-2 w-full focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-gray-50 rounded-lg border border-gray-300"
            type="text"
            id="nit"
            required
          />
        </div>
      )}
      <div className="flex flex-col md:flex-row justify-between gap-0 md:gap-5">
        <div className="mb-4 w-full">
          <label htmlFor="email" className="block text-sm text-gray-700">
            Correo electrónico *
          </label>
          <input
            type="email"
            name="email"
            className="mt-1 p-2 w-full focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-gray-50 rounded-lg border border-gray-300"
            value={registerData.email}
            onChange={event => setRegisterData({ ...registerData, email: event.target.value })}
            placeholder="email@shoep.com"
            id="email"
            required
          />
        </div>
        <div className="mb-4 w-full">
          <label htmlFor="phone_number" className="block text-sm text-gray-700">
            Número de teléfono *
          </label>
          <div className="flex items-center mt-1">
            <button
              className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100"
              type="button"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 me-2 mt-1 rounded-sm"
                viewBox="0 0 512 512"
                fill="none"
                aria-hidden="true"
              >
                <rect width="512" height="180.67" fill="#FFD700" />
                <rect y="170.67" width="512" height="120.67" fill="#0033A0" />
                <rect y="281.33" width="512" height="100.67" fill="#D52B1E" />
              </svg>
              +57
            </button>
            <div className="relative w-full">
              <input
                type="text"
                id="phone_number"
                name="phone_number"
                onChange={event => setRegisterData({ ...registerData, phone_number: Number(event.target.value) })}
                value={registerData.phone_number === 0 ? '' : registerData.phone_number}
                aria-describedby="helper-text-explanation"
                className="p-2 w-full focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-gray-50 rounded-r-lg border border-gray-300"
                placeholder="300 000 0000"
                required
              />
            </div>
          </div>
        </div>
      </div>
      {type === roleIds.BUYER || type === roleIds.ADMIN ? (
        <div className="flex flex-col md:flex-row justify-between gap-0 md:gap-5">
          <div className="mb-4 w-full">
            <label htmlFor="name" className="block text-sm text-gray-700">
              Nombres *
            </label>
            <input
              type="text"
              name="name"
              className="mt-1 p-2 w-full focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-gray-50 rounded-lg border border-gray-300"
              onChange={event => setRegisterData({ ...registerData, name: event.target.value })}
              placeholder="Nombres"
              id="name"
              required
            />
          </div>
          <div className="mb-4 w-full">
            <label htmlFor="lastname" className="block text-sm text-gray-700">
              Apellidos *
            </label>
            <input
              type="text"
              name="lastname"
              className="mt-1 p-2 w-full focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-gray-50 rounded-lg border border-gray-300"
              onChange={event => setRegisterData({ ...registerData, lastname: event.target.value })}
              placeholder="Apellidos"
              id="lastname"
              required
            />
          </div>
        </div>
      ) : (
        <></>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm text-gray-700">
              Contraseña
            </label>
            <input
              type="password"
              name="password"
              className="mt-1 p-2 w-full focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-gray-50 rounded-lg border border-gray-300"
              value={registerData.password}
              onChange={event => setRegisterData({ ...registerData, password: event.target.value })}
              placeholder="Contraseña"
              id="password"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="confirm_password" className="block text-sm text-gray-700">
              Confirmar contraseña
            </label>
            <input
              type="password"
              name="confirm_password"
              className="mt-1 p-2 w-full focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-gray-50 rounded-lg border border-gray-300"
              value={registerData.confirm_password}
              onChange={event => setRegisterData({ ...registerData, confirm_password: event.target.value })}
              placeholder="Confirmar contraseña"
              id="confirm_password"
            />
          </div>
        </div>
        <div className="flex flex-col w-full justify-around">
          {type === roleIds.BUYER || type === roleIds.SELLER ? (
            <Link
              to={type === roleIds.BUYER ? '/registrar/vendedor' : '/registrar/comprador'}
              className="w-full mt-1.5 md:mt-6 hover:bg-gray-50 border border-gray-300 text-black py-2 px-4 rounded focus:outline-none focus:shadow-outline text-center"
            >
              {type === roleIds.BUYER ? 'Soy un emprendedor' : 'Soy un comprador'}
            </Link>
          ) : (
            <div className="-mt-4 md:mb-0 mb-5">
              <label htmlFor="key" className="block text-sm text-gray-700">
                Código *
              </label>
              <input
                type="password"
                name="key"
                className="mt-1 p-2 w-full focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-gray-50 rounded-lg border border-gray-300"
                onChange={event => setRegisterData({ ...registerData, key: event.target.value })}
                placeholder="Key"
                id="key"
                required
              />
            </div>
          )}
          <button
            type="submit"
            className={`w-full md:mt-10 mt-5   text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline ${isTermsAndConditionsChecked ? 'cursor-pointer hover:bg-gray-400 bg-gray-500' : 'cursor-not-allowed bg-gray-400 '}`}
            disabled={!isTermsAndConditionsChecked}
          >
            Registrar
          </button>
          <div className="flex mt-3 items-start">
            <div className="flex items-center h-5">
              <input
                id="termsAndConditions"
                type="checkbox"
                value={isTermsAndConditionsChecked ? 'on' : 'off'}
                onChange={() => setIsTermsAndConditionsChecked(!isTermsAndConditionsChecked)}
                className="w-4 h-4 border border-gray-300 rounded bg-gray-50"
                required
              />
            </div>
            <label htmlFor="termsAndConditions" className="ms-2 text-sm font-light text-gray-500 ">
              Acepto los{' '}
              <Link className="text-blue-600 underline" to={'/terminos-y-condiciones'}>
                términos y condiciones
              </Link>
            </label>
          </div>
        </div>
      </div>
    </form>
  );
}
