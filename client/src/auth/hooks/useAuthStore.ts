import { onLoginBuyer, onLoginSeller, onLogout } from '../../store/auth/authSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/config';
import { IAuthForm } from '../interfaces/IAuthForm';
import { ResponseDto } from '../../dtos/ResponseDto';
import { IBuyer } from '../../interfaces/IBuyer';
import { ISeller } from '../../interfaces/ISeller';
import { roleIds } from '../../constants/role-ids';
import { ISellerForm } from '../interfaces/ISellerForm';
import { IBuyerForm } from '../interfaces/IBuyerForm';
import Swal from 'sweetalert2';
import { onCloseLoginModal } from '../../store/modal/modalSlice';
import { ENV } from '../../env';
import { IAdminForm } from '../interfaces/IAdminForm';

export function useAuthStore() {
  const { status, user, errorMessage } = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();
  const url = ENV.PROD;

  async function login(authData: IAuthForm) {
    try {
      const endpoint = 'users';
      const action = 'authenticate';
      const response = await fetch(`${url}/${endpoint}/${action}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(authData)
      });
      const user: ResponseDto<IBuyer | ISeller> = await response.json();
      if (!user.success) {
        Swal.fire('No fue posible iniciar sesión', user.message!, 'error');
      } else {
        localStorage.setItem('token', user.data!.token!);
        localStorage.setItem('token-init-date', new Date().getTime().toString());
        if (user.data?.role_id === roleIds.BUYER) {
          dispatch(onLoginBuyer(user.data as IBuyer));
        } else dispatch(onLoginSeller(user.data as ISeller));
        dispatch(onCloseLoginModal());
      }
    } catch (error) {
      localStorage.clear();
      dispatch(onLogout('Error al registrar al comprador'));
    }
  }

  async function logout() {
    Swal.fire('Sesión cerrada', 'Tu sesión ha sido cerrada correctamente', 'success');
    localStorage.clear();
    dispatch(onLogout(''));
  }

  async function registerBuyer(buyerData: IBuyerForm) {
    try {
      const endpoint = 'users';
      const type = 'buyer';
      const response = await fetch(`${url}/${endpoint}/${type}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(buyerData)
      });
      const user: ResponseDto<IBuyer> = await response.json();
      if (!user.success) {
        Swal.fire('No fue posible registrarte', user.message!, 'error');
      } else {
        Swal.fire('Registro exitoso', 'Tu cuenta ha sido creada correctamente', 'success');
        localStorage.setItem('token', user.data!.token!);
        localStorage.setItem('token-init-date', new Date().getTime().toString());
        dispatch(onLoginBuyer(user.data!));
      }
    } catch (error) {
      localStorage.clear();
      dispatch(onLogout('Error al registrar al comprador'));
    }
  }

  async function registerSeller(sellerData: ISellerForm) {
    try {
      const endpoint = 'users';
      const type = 'seller';
      const response = await fetch(`${url}/${endpoint}/${type}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(sellerData)
      });
      const user: ResponseDto<ISeller> = await response.json();
      if (!user.success) {
        Swal.fire('No fue posible registrarte', user.message!, 'error');
      } else {
        Swal.fire('Registro exitoso', 'Tu cuenta ha sido creada correctamente', 'success');
        localStorage.setItem('token', user.data!.token!);
        localStorage.setItem('token-init-date', new Date().getTime().toString());
        dispatch(onLoginSeller(user.data!));
      }

      /* localStorage.setItem('token', data.access_token); */
    } catch (error) {
      localStorage.clear();
      dispatch(onLogout('Error al registrar al vendedor'));
    }
  }

  async function registerAdmin(adminData: IAdminForm) {
    try {
      const endpoint = 'users';
      const type = 'admin';
      console.log(adminData);
      const response = await fetch(`${url}/${endpoint}/${type}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(adminData)
      });
      const user: ResponseDto<ISeller> = await response.json();
      if (!user.success) {
        Swal.fire('No fue posible registrarte', user.message!, 'error');
      } else {
        Swal.fire('Registro exitoso', 'Tu cuenta ha sido creada correctamente', 'success');
        dispatch(onLoginSeller(user.data!));
      }

      /* localStorage.setItem('token', data.access_token); */
    } catch (error) {
      localStorage.clear();
      dispatch(onLogout('Error al registrar al vendedor'));
    }
  }

  async function checkAuthToken() {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        localStorage.clear();
        return dispatch(onLogout(''));
      }

      const endpoint = 'users';
      const type = 'refresh-token';
      const response = await fetch(`${url}/${endpoint}/${type}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-token': localStorage.getItem('token')!
        }
      });

      const jwtData: ResponseDto<IBuyer | ISeller> = await response.json();
      if (jwtData.success) {
        localStorage.setItem('token', jwtData.data!.token!);
        localStorage.setItem('token-init-date', new Date().getTime().toString());
        if (jwtData.data?.role_id === roleIds.BUYER) {
          dispatch(onLoginBuyer(jwtData.data as IBuyer));
        } else dispatch(onLoginSeller(jwtData.data as ISeller));
      }
    } catch (error) {
      localStorage.clear();
      dispatch(onLogout(''));
    }
  }

  return {
    // Propiedades
    errorMessage,
    status,
    user,

    // Métodos
    checkAuthToken,
    login,
    logout,
    registerBuyer,
    registerSeller,
    registerAdmin
  };
}
