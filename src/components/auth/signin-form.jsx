"use client";

import { signIn } from "next-auth/react";
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

export function SignInForm() {
  const form = useForm({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = (data) => {
    const credentials = data;
    signIn("credentials", credentials);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          className="flex flex-col items-start"
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <div className="mb-1 flex flex-row gap-2">
                <FormLabel className="font-bold">Username or Email</FormLabel>
                <FormMessage className="-my-1" />
              </div>
              <FormControl>
                <Input
                  className="mb-4 w-full rounded-full border border-gray-300 px-4 py-4 focus:outline-none"
                  placeholder="janedoe"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          className="flex flex-col items-start"
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <div className="flex flex-row gap-2">
                <FormLabel className="font-bold">Password</FormLabel>
                <FormMessage className="-my-1" />
              </div>
              <FormControl>
                <Input
                  className="mb-4 w-full rounded-full border border-gray-300 px-4 py-4 focus:outline-none"
                  placeholder="********"
                  type="password"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="bg-ss-red-505 text-ss-light-555 dark:text-ss-light-222 hover:bg-ss-red-404 mt-1 mb-3 w-full rounded-full py-2 font-semibold transition"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? "Loading..." : "Sign In"}
        </Button>
      </form>
    </Form>
  );
}
