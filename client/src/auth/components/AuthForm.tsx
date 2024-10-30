import React, { useState } from 'react';
import { useAuthStore } from '../hooks/useAuthStore';
import { IAuthForm } from '../interfaces/IAuthForm';
import { useModalStore } from '../../platform/hooks/useModalStore';

export function   AuthForm() {
  const { login } = useAuthStore();
  const { closeLoginModal } = useModalStore();
  const [authForm, setAuthForm] = useState<IAuthForm>({
    email: '',
    password: ''
  });

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    login(authForm);
  }

  return (
    <form onSubmit={onSubmit} className="w-full text-left mx-auto mt-8 font-light">
      <div className="mb-4">
        <label htmlFor="email" className="block text-sm text-gray-700">
          Correo electrónico
        </label>
        <input
          id="login-email"
          type="email"
          value={authForm.email}
          onChange={event => setAuthForm({ ...authForm, email: event.target.value })}
          className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          placeholder="email@shoep.com"
          required
          lang="es"
        />
      </div>
      <div className="mb-6">
        <label htmlFor="password" className="block text-sm text-gray-700">
          Contraseña
        </label>
        <input
          id="login-password"
          type="password"
          value={authForm.password}
          onChange={event => setAuthForm({ ...authForm, password: event.target.value })}
          className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          placeholder="********"
          required
          lang="es"
        />
      </div>
      <div className="flex flex-col md:flex-row items-center justify-between gap-5">
        <button
          type="button"
          onClick={closeLoginModal}
          className="w-full text-black border hover:bg-gray-50 border-gray-400 py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Cerrar
        </button>
        <button
          type="submit"
          className="w-full bg-gray-500 hover:bg-gray-400 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Ingresar
        </button>
      </div>
    </form>
  );
}
