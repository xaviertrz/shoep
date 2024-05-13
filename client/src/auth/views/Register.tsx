import { Link } from 'react-router-dom';
import { MdOutlinePayment } from 'react-icons/md';
import { PiHighHeelDuotone } from 'react-icons/pi';
import { GrUserAdmin } from 'react-icons/gr';

import { TfiArrowRight } from 'react-icons/tfi';

import { Layout } from '../../components/Layout';
import { PageTitle } from '../../components/PageTitle';

export function Register() {
  return (
    <Layout>
      <PageTitle title="Registro" />
      <h2 className="text-xl font-light mb-10 text-center">¿Qué tipo de cuenta quieres crear?</h2>
      <div className="flex flex-col lg:flex-row items-center mx-auto justify-center gap-16 font-light mb-20">
        <Link
          to="./comprador"
          className="p-8 flex flex-col rounded-lg border border-gray-300 items-center gap-2 hover:bg-gray-50"
        >
          <div className="flex items-center gap-4">
            <MdOutlinePayment size={80} className="hover:scale-105 transition-all duration-700" />
            <div className="flex text-left flex-col gap-1">
              <h3 className="font-normal">Cuenta personal</h3>
              <span>Podrás hacer pagos en línea</span>
            </div>
          </div>
          <footer className="flex gap-2 font-normal items-center justify-end  w-full">
            <span className="">Crear</span>
            <TfiArrowRight />
          </footer>
        </Link>
        <Link
          to="./vendedor"
          className="p-8 flex flex-col rounded-lg border items-center border-gray-300 gap-2 hover:bg-gray-50"
        >
          <div className="flex items-center gap-4">
            <PiHighHeelDuotone size={80} className="hover:scale-105 transition-all duration-700" />
            <div className="flex text-left flex-col gap-1">
              <h3 className="font-normal">Cuenta emprendedor</h3>
              <span>Podrás publicar tus productos</span>
            </div>
          </div>
          <footer className="flex gap-2 font-normal items-center justify-end  w-full">
            <span className="">Crear</span>
            <TfiArrowRight />
          </footer>
        </Link>
        <Link
          to="./administrador"
          className="p-8 flex flex-col rounded-lg border items-center border-gray-300 gap-2 justify-center hover:bg-gray-50"
        >
          <div className="flex items-center gap-4">
            <GrUserAdmin size={80} className="hover:scale-105 transition-all duration-700" />
            <div className="flex text-left flex-col gap-1">
              <h3 className="font-normal">Cuenta administrador</h3>
            </div>
          </div>
          <footer className="flex gap-2 font-normal items-center justify-end  w-full">
            <span className="">Crear</span>
            <TfiArrowRight />
          </footer>
        </Link>
      </div>
    </Layout>
  );
}
