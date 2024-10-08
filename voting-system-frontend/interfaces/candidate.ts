export interface ICandidate {
    name: string;
    id: bigint;
    votes: bigint;
  }

export interface ICandidatesProps {
    candidatesList: ICandidate[];
  }
  