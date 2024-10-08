export default function VoteForm({
  candidates,
  onSubmit,
}: {
  candidates: string[];
  onSubmit: () => void;
}) {
  return (
    <form
      action={onSubmit}
      className="bg-gray-200 px-16 py-8 rounded-lg absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
    >
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
          <option key={candidate} value={candidate}>
            {candidate}
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
