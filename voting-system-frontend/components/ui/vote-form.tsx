"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { ICandidate } from "@/interfaces/candidate";

export const VoteFormSchema = z.object({
  candidate: z.string({
    required_error: "Please select a candidate",
  }),
  amount: z.coerce
    .number({ required_error: "Please enter a valid eth amount" })
    .gt(0, "The amount must be greater than 0"),
});

export default function VoteForm({
  candidates,
  onSubmit,
}: {
  candidates: ICandidate[];
  onSubmit: (values: z.infer<typeof VoteFormSchema>) => void;
}) {
  const form = useForm<z.infer<typeof VoteFormSchema>>({
    resolver: zodResolver(VoteFormSchema),
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="candidate"
          render={({ field }) => (
            <FormItem>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormLabel>Candidate name</FormLabel>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Candidate" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {candidates.map((candidate) => {
                    return (
                      <SelectItem
                        key={candidate.id}
                        value={candidate.id.toString()}
                      >
                        {candidate.name}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ether amount to give to the winner</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Vote</Button>
      </form>
    </Form>
  );
}
