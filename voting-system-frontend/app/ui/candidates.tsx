import { ICandidatesProps } from "@/interfaces/candidate";
import Candidate from "@/app/ui/candidate";
import { inter } from "@/app/ui/fonts";

export default function Candidates({ candidatesList }: ICandidatesProps) {
  return (
    <>
      <p
        className={`${inter.className} text-xl text-gray-800 md:text-3xl md:leading-normal`}
      >
        Candidates:
      </p>
      <div className="flex flex-row gap-8 mt-4">
        {candidatesList.map((candidate) => {
          return <Candidate key={candidate.id} candidate={candidate} />;
        })}
      </div>
    </>
  );
}
