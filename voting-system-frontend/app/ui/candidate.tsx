import { lusitana } from "@/app/ui/fonts";

export default function Candidate({ name }: { name: String }) {
  return (
    <div className="bg-blue-700 px-24 py-8 rounded-md">
      <p className={`${lusitana.className} text-2xl text-white`}>{name}</p>
    </div>
  );
}
