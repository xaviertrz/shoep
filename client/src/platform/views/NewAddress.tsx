import { AddressForm } from '../components/AddressForm';

export function NewAddress(): JSX.Element {
  return (
    <div className="max-w-5xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Agregar Nuevo Domicilio</h2>
      <AddressForm />
    </div>
  );
}
