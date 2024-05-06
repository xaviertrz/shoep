import { PiHighHeelDuotone } from 'react-icons/pi';
import { Layout } from '../../components/Layout';
import { Link } from 'react-router-dom';

export function Home() {
  return (
    <Layout>
      <div className="flex flex-col items-center pt-24 justify-center gap-5 pb-44">
        <PiHighHeelDuotone size={100} />
        <span className="text-center text-xl font-light text-balance">
          Descubre el encanto del calzado femenino en Bucaramanga. <br />{' '}
          <Link to={'/catalogo'} className="underline underline-offset-4 decoration-gray-500">
            Explora ahora.
          </Link>
        </span>
      </div>
    </Layout>
  );
}
