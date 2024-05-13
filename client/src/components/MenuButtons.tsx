import { Link } from 'react-router-dom';
import { LoginModal } from '../auth/components/LoginModal';

export function MenuButtons({
  buttons,
  style
}: {
  buttons: { label?: string; link?: string; action?: () => Promise<void> | void }[];
  style?: string;
}) {
  return (
    <ul className={`flex  list-none p-0 ${style}`}>
      {buttons.map(({ label, link, action }) => (
        <li key={label}>
          <Link
            onClick={action}
            className="uppercase block font-light px-2 text-gray-500 hover:text-black transition-all duration-200"
            to={link || ''}
          >
            {label}
          </Link>
        </li>
      ))}

      <LoginModal />
    </ul>
  );
}
