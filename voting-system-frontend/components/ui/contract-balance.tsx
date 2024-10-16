import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components//ui/card";

export const description = "A collection of health charts.";
export function ContractBalance({ balance }: { balance: string }) {
  return (
    <Card className="w-2/5" x-chunk="charts-01-chunk-0">
      <CardHeader className="space-y-0 pb-2">
        <CardDescription>Contract Balance</CardDescription>
        <CardTitle className="text-2xl tabular-nums">
          {balance}{" "}
          <span className="font-sans text-sm font-normal tracking-normal text-muted-foreground">
            {parseInt(balance) > 1 ? "ETHs" : "ETH"}
          </span>
        </CardTitle>
      </CardHeader>
    </Card>
  );
}
