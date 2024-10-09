"use client";

import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ICandidate } from "@/interfaces/candidate";

export const VoteFormSchema = z.object({
  candidate: z.string({
    required_error: "Please select a candidate",
  }),
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
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Candidate" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {candidates.map((candidate) => {
                    return (
                      <SelectItem value={candidate.id.toString()}>
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
        <Button type="submit">Vote</Button>
      </form>
    </Form>
  );
}
