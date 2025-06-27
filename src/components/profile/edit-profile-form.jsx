"use client";

import { useCurrentUserContext } from "@/contexts/current-user-context";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateUserSchema } from "@/lib/zod";

import { DialogFooter, DialogClose } from "@/components/ui/dialog";
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
import { Textarea } from "../ui/textarea";
import { Button } from "@/components/ui/button";

import { toast } from "sonner";

const EditProfileForm = ({ setDialogOpen }) => {
  const { currentUser, updateCurrentUser } = useCurrentUserContext();

  const form = useForm({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      fullname: currentUser?.fullname,
      username: currentUser?.username,
      job: currentUser?.job,
      bio: currentUser?.bio,
    },
  });

  const { isDirty, isValid } = form.formState;
  const isButtonDisabled = !isDirty || !isValid;

  const onSubmit = async (data) => {
    const userData = data;

    const optionalFields = ["job", "bio"];
    optionalFields.map((field) => {
      if (!userData[field]) {
        delete userData[field];
      }
    });

    await updateCurrentUser(userData);
    toast.success("Updated user profile!");

    setDialogOpen(false);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          className="flex flex-col items-start"
          control={form.control}
          name="fullname"
          render={({ field }) => (
            <FormItem>
              <div className="flex flex-row items-center gap-2">
                <FormLabel className="text-base font-bold">
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
              <div className="flex flex-row items-center gap-2">
                <FormLabel className="text-base font-bold">
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
                <FormLabel className="text-base font-bold">
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
                <FormLabel className="text-base font-bold">Bio</FormLabel>
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

        <DialogFooter className="mt-8 flex w-full flex-row items-center justify-end gap-3 lg:mt-10">
          <DialogClose asChild>
            <Button
              className="border-ss-black-171 text-ss-black-171 hover:bg-ss-black-171 hover:text-ss-light-777 dark:border-ss-light-333 dark:text-ss-light-333 hover:dark:bg-ss-light-333 hover:dark:text-ss-black-131 w-fit rounded-full border bg-transparent px-6 font-semibold transition-colors duration-150"
              type="button"
            >
              Cancel
            </Button>
          </DialogClose>
          <Button
            className="bg-ss-red-404 text-ss-light-222 hover:bg-ss-red-505/80 w-35 rounded-full px-4 font-semibold transition"
            type="submit"
            disabled={isButtonDisabled}
          >
            Save changes
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};

export default EditProfileForm;
