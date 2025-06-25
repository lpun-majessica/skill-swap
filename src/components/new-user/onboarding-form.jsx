"use client";

import { useCurrentUserContext } from "@/contexts/current-user-context";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import { UserInfoForm } from "./user-info-form";
import LoadingIcon from "../common/loading-icon";
import { NavigationDialog } from "./navigation-dialog";

const OnboardingForm = () => {
  const { isLoading } = useCurrentUserContext();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const router = useRouter();

  const confirm = useRef();

  const resetDialog = () => {
    setIsDialogOpen(false);
    confirm.current = () => {};
  };
  const yesCallback = () => {
    confirm.current();
    resetDialog();
  };
  const noCallback = () => {
    resetDialog();
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.history.pushState(null, document.title, window.location.href);
    }
  }, []);

  useEffect(() => {
    const handleClick = (e) => {
      e.preventDefault();

      setIsDialogOpen(true);
      confirm.current = () => {
        router.push(e.target.href);
      };
    };

    const handlePopState = () => {
      window.history.pushState(null, document.title, window.location.href);

      setIsDialogOpen(true);
      confirm.current = () => {
        router.push("/explore");
      };
    };
    const handleBeforeUnload = (e) => {
      e.preventDefault();
    };

    document.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", handleClick);
    });
    window.addEventListener("popstate", handlePopState);
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      document.querySelectorAll("a").forEach((link) => {
        link.removeEventListener("click", handleClick);
      });
      window.removeEventListener("popstate", handlePopState);
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  return (
    <div className="mx-4 my-3 flex flex-col items-center justify-center overflow-y-auto rounded-2xl md:py-8 lg:mx-7 lg:px-10">
      <h2 className="text-xl font-bold lg:mr-auto lg:pl-10 lg:text-2xl">
        Welcome to SkillSwap!
      </h2>
      <h3 className="mt-2 mb-8 text-center text-sm lg:mt-3 lg:mr-auto lg:mb-15 lg:pl-10 lg:text-left lg:text-base">
        Let's first customise your data for a better user experience :)
      </h3>

      <NavigationDialog
        isOpen={isDialogOpen}
        yesCallback={yesCallback}
        noCallback={noCallback}
      />

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
