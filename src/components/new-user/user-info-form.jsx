"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateUserSchema } from "@/lib/zod";

import { useCurrentUserContext } from "@/contexts/current-user-context";

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
import { Textarea } from "../ui/textarea";
import SkillFormItem from "./skill-form-item";
import LoadingIcon from "../common/loading-icon";

export function UserInfoForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { currentUser, updateCurrentUser } = useCurrentUserContext();

  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      fullname: currentUser?.fullname ?? "",
      username: currentUser?.username,
      job: "",
      bio: "",
      skillsToLearn: currentUser?.skillsToLearn ?? [],
      skillsToTeach: currentUser?.skillsToTeach ?? [],
    },
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);

    const { skillsToLearn, skillsToTeach, ...userData } = data;

    const optionalFields = ["job", "bio"];
    optionalFields.map((field) => {
      if (!userData[field]) {
        delete userData[field];
      }
    });

    await updateCurrentUser(userData);

    router.push("/explore");
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex h-fit flex-col gap-10 lg:flex-row lg:gap-15">
          <div className="dark:bg-ss-black-929 rounded-2xl p-6 shadow-lg inset-shadow-2xs lg:w-95 xl:w-lg">
            <FormField
              className="flex flex-col items-start"
              control={form.control}
              name="fullname"
              render={({ field }) => (
                <FormItem>
                  <div className="mb-1 flex flex-row items-center gap-2">
                    <FormLabel className="text-base font-bold lg:text-lg">
                      Your Name <span className="text-ss-red-505">*</span>
                    </FormLabel>
                    <FormMessage />
                  </div>
                  <FormControl>
                    <Input
                      className="mb-4 w-full rounded-full border border-gray-300 px-4 py-4 focus:outline-none"
                      placeholder="Jane Doe"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              className="flex flex-col items-start"
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <div className="mb-1 flex flex-row items-center gap-2">
                    <FormLabel className="text-base font-bold lg:text-lg">
                      Username <span className="text-ss-red-505">*</span>
                    </FormLabel>
                    <FormMessage />
                  </div>
                  <FormControl>
                    <Input
                      className="mb-4 w-full rounded-full border border-gray-300 px-4 py-4 focus:outline-none"
                      placeholder="jane.doe"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              className="flex flex-col items-start"
              control={form.control}
              name="job"
              render={({ field }) => (
                <FormItem>
                  <div className="flex flex-row items-center gap-2">
                    <FormLabel className="text-base font-bold lg:text-lg">
                      Current job title
                    </FormLabel>
                    <FormMessage />
                  </div>
                  <FormControl>
                    <Input
                      className="mb-4 w-full rounded-full border border-gray-300 px-4 py-4 focus:outline-none"
                      placeholder="Full-stack Developer"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              className="flex flex-col items-start"
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <div className="flex flex-row items-center gap-2">
                    <FormLabel className="text-base font-bold lg:text-lg">
                      Bio
                    </FormLabel>
                    <FormMessage />
                  </div>
                  <FormControl>
                    <Textarea
                      className="mb-4 w-full resize-none rounded-2xl border border-gray-300 px-4 py-2 focus:outline-none xl:min-h-20"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className="-mt-5 italic">
                    Short description about yourself
                  </FormDescription>
                </FormItem>
              )}
            />
          </div>

          <div className="flex flex-col gap-5 lg:gap-10">
            <FormField
              control={form.control}
              name="skillsToLearn"
              render={() => (
                <SkillFormItem type="learn" setFormValue={form.setValue} />
              )}
            />
            <FormField
              control={form.control}
              name="skillsToTeach"
              render={() => (
                <SkillFormItem type="teach" setFormValue={form.setValue} />
              )}
            />
          </div>
        </div>

        <div className="mt-8 flex w-full flex-row items-center justify-end lg:mt-10">
          <Button
            className="bg-ss-red-404 text-ss-light-222 hover:bg-ss-red-505/80 w-35 rounded-full px-4 font-semibold transition"
            disabled={isSubmitting}
          >
            {isSubmitting ? <LoadingIcon /> : "Save changes"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
