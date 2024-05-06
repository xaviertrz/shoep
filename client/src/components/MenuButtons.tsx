import { Link } from 'react-router-dom';
import { LoginModal } from '../auth/components/LoginModal';

export function MenuButtons({
  buttons
}: {
  buttons: { label?: string; link?: string; action?: () => Promise<void> | void }[];
}) {
  return (
    <ul className="flex items-center list-none p-0">
      {buttons.map(({ label, link, action }) => (
        <li key={label}>
          <Link
            onClick={action}
            className="uppercase font-light px-2 text-gray-500 hover:text-black transition-all duration-200"
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
