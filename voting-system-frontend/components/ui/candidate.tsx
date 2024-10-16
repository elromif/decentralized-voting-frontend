import { ICandidate } from "@/interfaces/candidate";

export default function Candidate({ candidate }: { candidate: ICandidate }) {
  return (
    <div className="rounded-lg border-solid border-grey-400 border-2 p-4">
      <p>
        <strong>{candidate.name}</strong>
      </p>
      <p>Votes count: {candidate.votes.toString()}</p>
    </div>
  );
}
