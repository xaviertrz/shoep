import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Layout } from '../../components/Layout';
import { PageTitle } from '../../components/PageTitle';
import { useUserStore } from '../hooks/useUserStore';

import { FiUser } from 'react-icons/fi';
import { roleIds } from '../../constants/role-ids';

export function Profile() {
  const { userUuid } = useParams();
  const { fetchUser, user } = useUserStore();

  useEffect(() => {
    if (userUuid) {
      fetchUser(userUuid);
    }
  }, []);

  return (
    <Layout>
      <PageTitle title="Perfil" />
      <div className="mt-10 text-left flex flex-col border-4 rounded-xl p-6 md:flex-row gap-6 justify-start items-start mb-44 w-fit">
        <FiUser className="text-6xl text-gray-500" />
        <div className="grid grid-cols-1 gap-4">
          <div className="flex flex-col gap-4">
            <div>
              <p className="font-light text-gray-500 text-sm uppercase">Usuario</p>
              <p className="text-gray-600 font-semibold text-base -mt-1 uppercase">
                {user.role_id === roleIds.BUYER
                  ? 'Comprador'
                  : user.role_id === roleIds.SELLER
                    ? 'Vendedor'
                    : 'Administrador'}
              </p>
            </div>
            <div>
              <p className="font-light text-gray-500 text-sm uppercase">Nombre</p>
              <p className="text-gray-600 font-semibold text-base -mt-1">{user.username}</p>
            </div>
            <div>
              <p className="font-light text-gray-500 text-sm uppercase">E-mail</p>
              <p className="text-gray-600 font-semibold text-base -mt-1">{user.email}</p>
            </div>
            <div>
              <p className="font-light text-gray-500 text-sm uppercase">Teléfono</p>
              <p className="text-gray-600 font-semibold text-base -mt-1">{user.phone_number}</p>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            {user.nit && (
              <div>
                <p className="font-light text-gray-500 text-sm uppercase">Nit</p>
                <p className="text-gray-600 font-semibold text-base -mt-1">{user.nit}</p>
              </div>
            )}
          </div>
          <div>
            <p className="font-light text-gray-500 text-sm uppercase">Creado</p>
            <p className="text-gray-600 font-semibold text-base -mt-1">{user.created_at.toString().split('T')[0]}</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
