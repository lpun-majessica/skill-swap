"use client";

import { useCurrentUserContext } from "@/contexts/current-user-context";

import { UserInfoForm } from "./user-info-form";
import LoadingIcon from "../common/loading-icon";

const OnboardingForm = () => {
  const { isLoading } = useCurrentUserContext();

  return (
    <div className="mx-4 my-3 flex flex-col items-center justify-center overflow-y-auto rounded-2xl md:py-8 lg:mx-7 lg:px-10">
      <h2 className="text-xl font-bold lg:mr-auto lg:pl-10 lg:text-2xl">
        Welcome to SkillSwap!
      </h2>
      <h3 className="mt-2 mb-8 text-center text-sm lg:mt-3 lg:mr-auto lg:mb-15 lg:pl-10 lg:text-left lg:text-base">
        Let's first customise your data for a better user experience :)
      </h3>

      {isLoading ? (
        <div className="flex h-[55vh] w-full items-center justify-center">
          <LoadingIcon />
        </div>
      ) : (
        <UserInfoForm />
      )}
    </div>
  );
};

export default OnboardingForm;
