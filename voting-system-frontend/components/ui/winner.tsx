"use client";
import contractData from "@/app/contract/Voting.json";
import { useReadContract, useAccount, useSendTransaction } from "wagmi";
import { arbitrumSepolia } from "wagmi/chains";
import { config } from "@/app/config";
import { ICandidate } from "@/interfaces/candidate";
import { Button } from "./button";
import { Card, CardContent, CardHeader } from "./card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { SendEthFormSchema } from "./send-eth-form";
import { z } from "zod";
import SendEthForm from "./send-eth-form";
import { ethers } from "ethers";

export default function Winner() {
  const [displaySendEthForm, setdisplaySendEthForm] = useState<boolean>(false);

  const { data: winnerData } = useReadContract({
    address: contractData.address as `0x${string}`,
    abi: contractData.abi,
    functionName: "getWinner",
    config: config,
    chainId: arbitrumSepolia.id,
  });

  const winner = (winnerData as ICandidate) || undefined;

  const account = useAccount();

  const { sendTransaction } = useSendTransaction();

  function handleSendEthToWinner(values: z.infer<typeof SendEthFormSchema>) {
    const amount = values.amount;

    sendTransaction({
      to: winner.candidate_address as `0x${string}`,
      value: ethers.parseEther(amount.toString()),
    });

    setdisplaySendEthForm(false);
  }

  return (
    <Card>
      <CardHeader>
        The voting period is over ! The winner is...{" "}
        <strong className="text-lg">{winner?.name} !</strong>
      </CardHeader>

      <CardContent>
        <Dialog
          open={account.isConnected && displaySendEthForm}
          onOpenChange={() => setdisplaySendEthForm(!displaySendEthForm)}
        >
          <DialogTrigger asChild>
            <Button className="w-full">Send ETH to {winner?.name} </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Send ETH To The Elections Winner</DialogTitle>
            </DialogHeader>
            <SendEthForm onSubmit={handleSendEthToWinner} />
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}
