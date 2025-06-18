"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema } from "@/lib/zod";
import { toast } from "sonner";

import authService from "@/services/auth";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function SignUpForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      username: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);

    try {
      await authService.signUp(data);

      toast.success("Registration Successful");
      return router.push("/signin");
    } catch (error) {
      console.error("Registration Failed:", error);
      toast.error(error.message);
    }

    setIsSubmitting(false);
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
                <FormLabel className="font-bold">Username</FormLabel>
                <FormMessage className="-my-1" />
              </div>
              <FormControl>
                <Input
                  className="mb-4 w-full rounded-full border border-gray-300 px-4 py-4 focus:outline-none"
                  placeholder="janedoe"
                  {...field}
                />
              </FormControl>
              <FormDescription className="-mt-5 mb-5 ml-3 text-sm italic">
                You can change your username later
              </FormDescription>
            </FormItem>
          )}
        />

        <FormField
          className="flex flex-col items-start"
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <div className="mb-1 flex flex-row gap-2">
                <FormLabel className="font-bold">Email</FormLabel>
                <FormMessage className="-my-1" />
              </div>
              <FormControl>
                <Input
                  className="mb-4 w-full rounded-full border border-gray-300 px-4 py-4 focus:outline-none"
                  placeholder="janedoe@email.com"
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
              <div className="mb-1 flex flex-row gap-2">
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
          className="bg-ss-red-404 text-ss-light-555 dark:text-ss-light-222 hover:bg-ss-red-505 mb-2 w-full rounded-full py-2 font-semibold transition"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Loading..." : "Create New Account"}
        </Button>
      </form>
    </Form>
  );
}
