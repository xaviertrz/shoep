import { Layout } from '../../components/Layout';
import { PageTitle } from '../../components/PageTitle';
import { roleIds } from '../../constants/role-ids';
import { RegisterForm } from '../components/RegisterForm';

export function RegisterBuyer() {
  return (
    <Layout>
      <PageTitle title="Registro: Cuenta personal" />
      <span className="font-light text-left flex mb-10">Completa los campos para continuar.</span>
      <div className="mx-auto bg-white">
        <div className="flex justify-center">
          <RegisterForm type={roleIds.BUYER} />
        </div>
      </div>
    </Layout>
  );
}
