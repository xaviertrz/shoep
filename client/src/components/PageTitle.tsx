export function PageTitle({ title }: { title: string }) {
  return (
    <div className="flex flex-col text-left mb-4">
      <span className="uppercase font-light text-xs text-gray-500 ">Estás en</span>
      <h1 className="text-xl font-serif text-left -mt-0.5 capitalize">{title}</h1>
    </div>
  );
}
