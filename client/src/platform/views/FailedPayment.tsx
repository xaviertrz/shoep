import { HiXCircle } from 'react-icons/hi2';

import { Layout } from '../../components/Layout';
import { PageTitle } from '../../components/PageTitle';

export function FailedPayment() {
  return (
    <Layout>
      <PageTitle title="Pago fallido" />
      <div className="flex gap-4 text-left pb-40 pt-10">
        <HiXCircle className="text-red-500 text-6xl" />
        <div>
          <h1 className="font-light text-2xl">Ocurrió un error procesando tu pago</h1>
          <p className="font-light text-gray-500">Tu pago no se pudo procesar. Por favor, intenta de nuevo.</p>
        </div>
      </div>
    </Layout>
  );
}
