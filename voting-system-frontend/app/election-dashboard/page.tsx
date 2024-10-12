"use client";
import VoteForm from "@/components/ui/vote-form";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import {
  useAccount,
  useReadContract,
  useWriteContract,
  useWaitForTransactionReceipt,
  useBalance,
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
import Winner from "@/components/ui/winner";
import { ethers } from "ethers";

export default function Vote() {
  const [displayVoteForm, setDisplayVoteForm] = useState<boolean>(false);
  const [displayWalletWarningMessage, setDisplayWalletWarningMessage] =
    useState<boolean>(false);

  const account = useAccount();
  const { data: hash, error: voteError, writeContract } = useWriteContract();

  const { data: candidatesData } = useReadContract({
    address: contractData.address as `0x${string}`,
    abi: contractData.abi,
    functionName: "getCandidates",
    config: config,
    chainId: arbitrumSepolia.id,
  });

  const candidatesList = (candidatesData as ICandidate[]) || [];

  const { data: isVotingPeriodRunning } = useReadContract({
    address: contractData.address as `0x${string}`,
    abi: contractData.abi,
    functionName: "getVotingPeriodStatus",
    config: config,
    chainId: arbitrumSepolia.id,
  });

  useEffect(() => {
    if (!account.isConnected && isVotingPeriodRunning) {
      setDisplayWalletWarningMessage(true);
    } else {
      setDisplayWalletWarningMessage(false);
    }
  }, [account.isConnected, isVotingPeriodRunning]);

  function handleVoteButtonClick() {
    if (account.isConnected) {
      setDisplayVoteForm(true);
    }
  }

  function handleVote(values: z.infer<typeof VoteFormSchema>) {
    const candidateId = values.candidate;
    const amount = values.amount;

    writeContract({
      address: contractData.address as `0x${string}`,
      abi: contractData.abi,
      functionName: "vote",
      args: [BigInt(candidateId)],
      value: ethers.parseEther(amount.toString()),
    });

    setDisplayVoteForm(false);
  }

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  const { data: balanceData } = useBalance({
    address: contractData.address as `0x${string}`,
  });

  let formattedBalance: string = "";
  if (balanceData) {
    formattedBalance = ethers.formatEther(balanceData.value).toString();
  }

  return (
    <main className="flex min-h-screen flex-col p-6">
      <div className=" h-24 shrink-0 rounded-lg bg-blue-500 p-4"></div>
      <div className="mt-4 flex grow gap-4">
        <div className="flex flex-col justify-top items-center gap-6 rounded-lg bg-gray-50 px-6 py-10 md:px-20 grow">
          <button className="self-start">
            <ConnectButton />
          </button>
          {isVotingPeriodRunning ? (
            <div>
              <Candidates candidatesList={candidatesList} />
              <Dialog
                open={account.isConnected && displayVoteForm}
                onOpenChange={() => setDisplayVoteForm(!displayVoteForm)}
              >
                <DialogTrigger asChild>
                  <Button
                    className="w-full mt-8"
                    onClick={handleVoteButtonClick}
                  >
                    Vote
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Cast Your Vote</DialogTitle>
                    <DialogDescription>
                      This action cannot be undone.
                    </DialogDescription>
                  </DialogHeader>
                  <VoteForm candidates={candidatesList} onSubmit={handleVote} />
                </DialogContent>
              </Dialog>
            </div>
          ) : (
            <Winner />
          )}

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
          {isConfirming && <div>Waiting for confirmation...</div>}
          {isConfirmed && <div>Transaction confirmed.</div>}
          <div>Contract balance: {formattedBalance} Ethers</div>
        </div>
      </div>
    </main>
  );
}
