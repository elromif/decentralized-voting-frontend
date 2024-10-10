"use client";
import VoteForm from "@/components/ui/vote-form";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import {
  useAccount,
  useReadContract,
  useWriteContract,
  type BaseError,
} from "wagmi";
import { useState, useEffect } from "react";
import { config } from "@/app/config";
import { arbitrumSepolia } from "wagmi/chains";
import { ICandidate } from "@/interfaces/candidate";
import Candidates from "@/components/ui/candidates";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { VoteFormSchema } from "@/components/ui/vote-form";
import { z } from "zod";
import contractData from "@/app/contract/Voting.json";

export default function Vote() {
  const [displayVoteForm, setDisplayVoteForm] = useState<boolean>(false);
  const [displayWalletWarningMessage, setDisplayWalletWarningMessage] =
    useState<boolean>(true);
  const [candidates, setCandidates] = useState<ICandidate[]>([]);

  const account = useAccount();
  const { data: hash, error: voteError, writeContract } = useWriteContract();

  const { data: candidatesData } = useReadContract({
    address: contractData.address as `0x${string}`,
    abi: contractData.abi,
    functionName: "getCandidates",
    config: config,
    chainId: arbitrumSepolia.id,
  });

  useEffect(() => {
    if (account.isConnected) {
      setDisplayWalletWarningMessage(false);
    } else {
      setDisplayWalletWarningMessage(true);
    }
  }, [account.isConnected]);

  function handleVoteButtonClick() {
    if (account.isConnected) {
      setDisplayVoteForm(true);
    }
  }

  useEffect(() => {
    const candidatesList = (candidatesData as ICandidate[]) || [];
    setCandidates(candidatesList);
  }, [candidatesData]);

  function handleVote(values: z.infer<typeof VoteFormSchema>) {
    const candidateId = values.candidate;

    writeContract({
      address: contractData.address as `0x${string}`,
      abi: contractData.abi,
      functionName: "vote",
      args: [BigInt(candidateId)],
    });
    setDisplayVoteForm(false);
    console.log("vote casted: ", hash);
  }

  return (
    <main className="flex min-h-screen flex-col p-6">
      <div className=" h-24 shrink-0 rounded-lg bg-blue-500 p-4"></div>
      <div className="mt-4 flex grow gap-4">
        <div className="flex flex-col justify-top items-center gap-6 rounded-lg bg-gray-50 px-6 py-10 md:px-20 grow">
          <button className="self-start">
            <ConnectButton />
          </button>
          <div>
            <Candidates candidatesList={candidates} />
            <Dialog
              open={account.isConnected && displayVoteForm}
              onOpenChange={() => setDisplayVoteForm(!displayVoteForm)}
            >
              <DialogTrigger asChild>
                <Button className="w-full mt-8" onClick={handleVoteButtonClick}>
                  Vote
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Choose your candidate</DialogTitle>
                  <DialogDescription>
                    This action cannot be undone.
                  </DialogDescription>
                </DialogHeader>
                <VoteForm candidates={candidates} onSubmit={handleVote} />
              </DialogContent>
            </Dialog>
          </div>
          {displayWalletWarningMessage && (
            <p className="text-red-500">
              You need to connect your wallet to vote!
            </p>
          )}
          {voteError && (
            <div className="text-red-500">
              Error:{" "}
              {(voteError as BaseError).shortMessage || voteError.message}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
