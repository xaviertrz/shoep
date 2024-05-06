import { Link } from 'react-router-dom';
import { IProduct } from '../../interfaces/IProduct';

export function ProductPreview({ product }: { product: IProduct }) {
  return (
    <Link
      to={`/productos/${product.uuid}`}
      className="flex flex-col border rounded-md overflow-hidden transition duration-300 transform hover:shadow-lg bg-white"
    >
      <div className="flex-none w-full">
        <img
          src={product.product_variants[0]?.product_images[0]?.source}
          alt={product.name}
          className="object-cover w-full h-48"
        />
      </div>
      <div className="flex flex-col justify-between text-left text-black flex-grow p-5 border-t">
        <div>
          <h2 className="font-light mb-2 line-clamp-2">{product.name}</h2>
          <p className="text-xl mb-2 font-medium">$ {product.product_variants[0]?.price.toLocaleString('es-CO')}</p>
          <span className="text-sm font-light text-gray-500">Publicado por {product.users?.username}</span>
        </div>
      </div>
    </Link>
  );
}
