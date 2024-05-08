import { useAppDispatch, useAppSelector } from '../../hooks/config';
import { ResponseDto } from '../../dtos/ResponseDto';
import { IGenericUser } from '../../interfaces/IGenericUser';
import { onSetUser } from '../../store/user/userSlice';
import { ENV } from '../../env';

export function useUserStore() {
  const { user } = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();
  const url = ENV.PROD;

  async function fetchUser(userUuid: string) {
    try {
      const endpoint = 'users';
      const filter = 'id';
      const response = await fetch(`${url}/${endpoint}/${filter}/${userUuid}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const userData: ResponseDto<IGenericUser> = await response.json();
      if (userData.success) {
        dispatch(onSetUser(userData.data!));
      }
    } catch (error) {
      console.error(error);
    }
  }

  return {
    // Propiedades
    user,

    // Métodos
    fetchUser
  };
}
