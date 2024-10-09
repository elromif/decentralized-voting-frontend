"use client";
import contractData from "@/app/contract/Voting.json";
import { useReadContract } from "wagmi";
import { arbitrumSepolia } from "wagmi/chains";
import { config } from "@/app/config";
import { ICandidate } from "@/interfaces/candidate";

export default function Winner() {
  const { data: winner } = useReadContract({
    address: contractData.address as `0x${string}`,
    abi: contractData.abi,
    functionName: "getWinner",
    config: config,
    chainId: arbitrumSepolia.id,
  });

  return <p>{(winner as ICandidate).name}</p>;
}
