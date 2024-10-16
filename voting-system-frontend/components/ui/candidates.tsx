import { ICandidatesProps } from "@/interfaces/candidate";
import Candidate from "./candidate";

export default function Candidates({ candidatesList }: ICandidatesProps) {
  return (
    <div>
      <div className="flex flex-row flex-wrap justify-start gap-8">
        {candidatesList.map((candidate) => {
          return <Candidate key={candidate.id} candidate={candidate} />;
        })}
      </div>
    </div>
  );
}
