import AddBages from "./add-bages";

export default function PageHeader() {
  return (
    <div className="flex items-center justify-between md:flex-row flex-col gap-4">
      <h1 className="text-3xl font-bold"> الباركود</h1>
      <AddBages />
    </div>
  );
}
