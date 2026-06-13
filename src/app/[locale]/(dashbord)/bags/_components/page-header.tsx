import AddBages from "./add-bages";

export default function PageHeader() {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <h1 className="text-2xl lg:text-3xl font-bold">الباركود</h1>
      <AddBages />
    </div>
  );
}
