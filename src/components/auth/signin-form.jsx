"use client";

import { signIn } from "@/auth";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInSchema } from "@/lib/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";

export function SignInForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (data) => {
    setIsSubmitting(true);

    const email = data;
    signIn("resend", email);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          className="flex flex-col items-start"
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <div className="mb-1 flex flex-row items-center gap-2">
                <FormLabel className="font-bold">Email</FormLabel>
                <FormMessage />
              </div>
              <FormControl>
                <Input
                  className="mb-4 w-full rounded-full border border-gray-300 px-4 py-4 focus:outline-none"
                  placeholder="janedoe@example.com"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <Button
          className="bg-ss-light-222 text-ss-black-121 hover:bg-ss-light-333 w-full rounded-full py-2 font-semibold transition"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            "Loading..."
          ) : (
            <span className="flex flex-row gap-2">
              <Mail className="mt-0.75 size-4" />
              Send Verification Email
            </span>
          )}
        </Button>
      </form>
    </Form>
  );
}
