import { IoSearchOutline } from 'react-icons/io5';

export default function SearchBar() {
  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log('form sent!');
  }

  return (
    <form onSubmit={onSubmit} className="relative w-full">
      <input
        type="text"
        name="search"
        placeholder="Buscar por productos..."
        autoComplete="off"
        className="w-full px-4 py-2 border border-gray-300 text-sm leading-5 font-normal text-black bg-transparent rounded-md"
      />
      <div className="flex absolute top-0 right-0 mr-3 items-center h-full">
        <IoSearchOutline size={20} className="h-4 transition-all duration-300 hover:scale-110" />
      </div>
    </form>
  );
}
