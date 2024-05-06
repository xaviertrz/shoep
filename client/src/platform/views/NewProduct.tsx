import { Layout } from '../../components/Layout';
import { PageTitle } from '../../components/PageTitle';
import { ProductForm } from '../components/ProductForm';

export function NewProduct(): JSX.Element {
  return (
    <Layout>
      <PageTitle title="Nuevo Producto" />
      <ProductForm />
    </Layout>
  );
}
