"use client";
import contractData from "@/app/contract/Voting.json";
import { useReadContract } from "wagmi";
import { arbitrumSepolia } from "wagmi/chains";
import { config } from "@/app/config";
import { ICandidate } from "@/interfaces/candidate";
import { Button } from "./button";
import { Card, CardContent, CardHeader } from "./card";

export default function Winner() {
  const { data: winnerData } = useReadContract({
    address: contractData.address as `0x${string}`,
    abi: contractData.abi,
    functionName: "getWinner",
    config: config,
    chainId: arbitrumSepolia.id,
  });

  const winner = (winnerData as ICandidate) || undefined;

  console.log(winner);

  return (
    <Card>
      <CardHeader>
        The voting period is over ! The winner is...{" "}
        <strong className="text-lg">{winner?.name} !</strong>
      </CardHeader>
      <CardContent>
        <Button className="w-full">Send ETH to {winner?.name} </Button>
      </CardContent>
    </Card>
  );
}
