import { ICandidate, ICandidatesProps } from "@/interfaces/candidate";
import { lusitana } from "@/app/ui/fonts";
import Candidate from "@/app/ui/candidate";

export default function Candidates({ candidatesList }: ICandidatesProps) {
  return (
    <div className="flex flex-row gap-8">
      {candidatesList.map((candidate) => {
        return <Candidate key={candidate.id} name={candidate.name} />;
      })}
    </div>
  );
}
