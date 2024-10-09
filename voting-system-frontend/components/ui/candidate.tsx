import { inter } from "./fonts";
import { ICandidate } from "@/interfaces/candidate";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Candidate({ candidate }: { candidate: ICandidate }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className={`${inter.className} text-lg`}>
          {candidate.name}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p>Votes count: {candidate.votes.toString()}</p>
      </CardContent>
    </Card>
  );
}
