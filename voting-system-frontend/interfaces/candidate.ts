export interface ICandidate {
    name: string;
    id: bigint;
    votes: bigint;
    candidate_address: string;
  }

export interface ICandidatesProps {
    candidatesList: ICandidate[];
  }
  