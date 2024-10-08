import { inter } from "@/app/ui/fonts";
import { ICandidate } from "@/interfaces/candidate";

export default function Candidate({ candidate }: { candidate: ICandidate }) {
  return (
    <div className="bg-blue-700 px-24 py-8 rounded-md">
      <p className={`${inter.className} text-2xl text-white`}>
        {candidate.name}
      </p>
      <p className={`${inter.className} text-2xl text-white`}>
        Votes: {candidate.votes.toString()}
      </p>
    </div>
  );
}
