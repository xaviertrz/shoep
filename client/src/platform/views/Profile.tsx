import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Layout } from '../../components/Layout';
import { PageTitle } from '../../components/PageTitle';
import { useUserStore } from '../hooks/useUserStore';

import { PiUserRectangleDuotone } from 'react-icons/pi';

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
      <div className="text-left flex gap-6 items-center justify-center  pb-44">
        <div className="pr-4 border-r border-gray-300 items-start">
          <PiUserRectangleDuotone size={150} className="" />
        </div>
        <div className="grid grid-cols-2 gap-10">
          <div className="flex flex-col gap-4">
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
        </div>
      </div>
    </Layout>
  );
}
