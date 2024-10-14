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
import { Input } from "@/components/ui/input";

export const SendEthFormSchema = z.object({
  amount: z.coerce
    .number({ required_error: "Please enter a valid eth amount" })
    .gt(0, "The amount must be greater than 0"),
});

export default function SendEthForm({
  onSubmit,
}: {
  onSubmit: (values: z.infer<typeof SendEthFormSchema>) => void;
}) {
  const form = useForm<z.infer<typeof SendEthFormSchema>>({
    resolver: zodResolver(SendEthFormSchema),
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ether amount to send to the winner</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Send ETH</Button>
      </form>
    </Form>
  );
}
