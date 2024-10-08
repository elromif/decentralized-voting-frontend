"use client";
import VoteForm from "../ui/vote-form";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, useReadContract, useReadContracts } from "wagmi";
import { useState, useEffect } from "react";
import { config } from "../config";
import abi from "../contract/abi";
import { arbitrumSepolia } from "wagmi/chains";
import { ICandidate } from "@/interfaces/candidate";
import Candidates from "../ui/candidates";
import { readContract } from "@wagmi/core";

export default function Vote() {
  const [displayVoteForm, setDisplayVoteForm] = useState<boolean>(false);
  const [displayWarningMessage, setDisplayWarningMessage] =
    useState<boolean>(false);

  const account = useAccount();

  const {
    data: candidates,
    isError: candidatesIsError,
    isPending: candidatesIsPending,
  } = useReadContract({
    abi: abi,
    address: "0xbb97856948f2e7317a703667149Cf44fF34a8CBb",
    functionName: "getCandidates",
    config: config,
    chainId: arbitrumSepolia.id,
  });

  const candidatesList = (candidates as ICandidate[]) || [];

  // const fetchVotes = async (id: bigint) => {
  //   try {
  //     const result = await readContract(config, {
  //       address: "0xbb97856948f2e7317a703667149Cf44fF34a8CBb",
  //       abi: abi,
  //       functionName: "getCandidateVotes",
  //       args: [id],
  //     });
  //     return result;
  //   } catch (error) {
  //     console.error("Error reading contract:", error);
  //     return null;
  //   }
  // };

  // useEffect(() => {
  //   const fetchAllVotes = async () => {
  //     const results = (await Promise.all(
  //       candidatesList.map((candidate) => fetchVotes(candidate.id))
  //     )) as bigint[];
  //     console.log(results);
  //   };
  //   fetchAllVotes();
  // }, []);

  function handleVoteButtonClick() {
    if (account.isConnected) {
      setDisplayVoteForm(true);
      setDisplayWarningMessage(false);
    } else {
      setDisplayWarningMessage(true);
    }
  }

  function handleVote() {
    console.log("vote casted!");
    setDisplayVoteForm(false);
  }

  return (
    <main className="flex min-h-screen flex-col p-6">
      <div className=" h-20 shrink-0 rounded-lg bg-blue-500 p-4 md:h-52"></div>
      <div className="mt-4 flex grow gap-4">
        <div className="flex flex-col justify-top items-center gap-6 rounded-lg bg-gray-50 px-6 py-10 md:px-20 grow">
          <button className="self-start">
            <ConnectButton />
          </button>
          <Candidates candidatesList={candidatesList} />
          <button
            className="flex items-center gap-5 rounded-lg bg-green-600 px-64 py-4 text-white transition-colors hover:bg-green-500 md:text-base mt-16"
            onClick={handleVoteButtonClick}
          >
            Vote
          </button>
          {displayVoteForm && (
            <VoteForm
              candidates={candidatesList.map((candidate) => {
                return candidate.name;
              })}
              onSubmit={handleVote}
            />
          )}
          {displayWarningMessage && (
            <p className="text-red-500">
              You need to connect your wallet to vote!
            </p>
          )}
        </div>
      </div>
    </main>
  );
}
