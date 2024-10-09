import { ICandidate } from "@/interfaces/candidate";

export default function VoteForm({
  candidates,
  onSubmit,
}: {
  candidates: ICandidate[];
  onSubmit: () => void;
}) {
  return (
    <form action={onSubmit}>
      <select
        id="vote"
        name="vote"
        className="block w-full rounded-md border border-gray-200 py-2 pl-10 text-lg outline-2 placeholder:text-gray-500"
        defaultValue=""
        aria-describedby="customer-error"
      >
        <option value="" disabled>
          Choose your candidate
        </option>
        {candidates.map((candidate) => (
          <option key={candidate.id} value={candidate.id.toString()}>
            {candidate.name}
          </option>
        ))}
      </select>
      <button
        type="submit"
        className="flex items-center gap-5 rounded-lg bg-green-600 px-32 py-4 text-white transition-colors hover:bg-green-500 md:text-base mt-8"
      >
        Vote
      </button>
    </form>
  );
}
