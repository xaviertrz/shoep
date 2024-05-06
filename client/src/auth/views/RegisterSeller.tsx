import { Layout } from '../../components/Layout';
import { PageTitle } from '../../components/PageTitle';
import { roleIds } from '../../constants/role-ids';
import { RegisterForm } from '../components/RegisterForm';

export function RegisterSeller() {
  return (
    <Layout>
      <PageTitle title="Registro: Cuenta emprendedor" />
      <span className="font-light text-left flex mb-10">Completa los campos para continuar.</span>
      <div className="mx-auto bg-white">
        <div className="flex justify-center">
          <RegisterForm type={roleIds.SELLER} />
        </div>
      </div>
    </Layout>
  );
}
