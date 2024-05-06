import { Link } from 'react-router-dom';
import { GoCheckCircleFill } from 'react-icons/go';

import { Layout } from '../../components/Layout';
import { PageTitle } from '../../components/PageTitle';

export function SuccessPayment() {
  return (
    <Layout>
      <PageTitle title="Pago exitoso" />
      <div className="flex gap-4 text-left pb-40 pt-10">
        <GoCheckCircleFill className="text-green-500 text-6xl" />
        <div>
          <h1 className="font-light text-2xl">Hemos procesado tu pago</h1>
          <p className="font-light text-gray-500">
            Tu pago ha sido procesado exitosamente. Visita{' '}
            <Link to={''} className="font-light text-blue-600">
              mis ordenes
            </Link>{' '}
            para ver tus pedidos.
          </p>
        </div>
      </div>
    </Layout>
  );
}
