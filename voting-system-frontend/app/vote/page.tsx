"use client";
import VoteForm from "../ui/vote-form";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, useReadContract } from "wagmi";
import { useState } from "react";
import { config } from "../config";
import abi from "../contract/abi";
import { arbitrumSepolia } from "wagmi/chains";
import { ICandidate } from "@/interfaces/candidate";
import Candidates from "../ui/candidates";

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
    address: "0xe20CA1df7C8b37a7222FC818A43fB3F46E7B3193",
    functionName: "getCandidates",
    config: config,
    chainId: arbitrumSepolia.id,
  });

  const candidatesList = (candidates as ICandidate[]) || [];
  console.log(candidatesList);

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
          <div>
            <Candidates candidatesList={candidatesList} />
            <button
              className="text-center rounded-lg bg-green-600 w-full text-white transition-colors hover:bg-green-500 mt-16 py-4 text-xl"
              onClick={handleVoteButtonClick}
            >
              Vote
            </button>
          </div>
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
