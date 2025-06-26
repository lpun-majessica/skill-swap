"use client";

import { useState, useEffect } from "react";
import { useUserContext } from "@/contexts/users-context";
import { useMediaQuery } from "@/hooks";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "../ui/button";
import { Command, CommandInput } from "@/components/ui/command";
import { Filter as FilterIcon } from "lucide-react";

import SkillGroup from "./skill-group";

const initialFilter = [];

export default function Filter() {
  const { setSelectedTeach, setSelectedLearn } = useUserContext();

  useEffect(() => {
    return () => {
      setSelectedLearn(initialFilter);
      setSelectedTeach(initialFilter);
    };
  }, []);

  const handleClearAll = () => {
    setSelectedTeach(initialFilter);
    setSelectedLearn(initialFilter);
  };

  return (
    <>
      <Drawer autoFocus={true}>
        <DrawerTrigger asChild>
          <Button className="dark:bg-ss-black-131 dark:text-ss-light-555 text-ss-black-121 bg-ss-black-171/20 mx-3 flex w-full items-center gap-2 rounded-4xl text-base font-semibold sm:hidden">
            <FilterIcon size={16} />
            Filter
          </Button>
        </DrawerTrigger>

        <DrawerContent className="bg-ss-light-FFF dark:bg-ss-black-929 mx-auto min-h-[650px] max-w-sm px-4">
          <DrawerTitle className="flex items-center gap-2 px-3 pt-3 pb-2">
            <FilterIcon size={16} className="text-black dark:text-gray-300" />
            <span className="text-base font-semibold text-black dark:text-white">
              Filter
            </span>

            <Button
              variant="outline"
              onClick={handleClearAll}
              className="text-ss-red-666 ml-auto text-sm"
            >
              Clear all
            </Button>
          </DrawerTitle>
          <DrawerDescription className="hidden">
            Filter user by skill
          </DrawerDescription>
          <FilterBody />
        </DrawerContent>
      </Drawer>

      <div className="bg-ss-light-FFF dark:bg-ss-black-929 hidden h-[625px] w-[254px] flex-col rounded-2xl p-4 shadow-md sm:flex">
        <TopBar handleClearAll={handleClearAll} />
        <FilterBody />
      </div>
    </>
  );
}

function TopBar({ handleClearAll }) {
  return (
    <div className="mb-4 hidden items-center justify-between sm:flex">
      <div className="flex items-center gap-2">
        <FilterIcon size={16} className="text-black dark:text-white" />
        <span className="text-base font-semibold text-black sm:text-lg dark:text-white">
          Filter
        </span>
      </div>
      <Button
        variant="link"
        onClick={handleClearAll}
        className="text-ss-red-666 text-sm"
      >
        Clear all
      </Button>
    </div>
  );
}

function FilterBody() {
  const { selectedTeach, setSelectedTeach, selectedLearn, setSelectedLearn } =
    useUserContext();

  const filterGroups = [
    {
      value: "teaching",
      title: "Teaching",
      selectedSkills: selectedTeach,
      setSelectedSkills: setSelectedTeach,
    },
    {
      value: "learning",
      title: "Learning",
      selectedSkills: selectedLearn,
      setSelectedSkills: setSelectedLearn,
    },
  ];

  return (
    <Accordion type="single" defaultValue="teaching" collapsible>
      <Command className="bg-transparent">
        <CommandInput placeholder="Search skill" className="h-9" />
        {filterGroups.map(
          ({ value, title, selectedSkills, setSelectedSkills }) => (
            <AccordionItem key={value} value={value}>
              <AccordionTrigger>
                {title}
                <span className="bg-ss-black-121 text-ss-light-222 dark:bg-ss-light-333 dark:text-ss-black-121 my-auto ml-auto size-4 rounded-full text-center text-xs">
                  {selectedSkills.length}
                </span>
              </AccordionTrigger>
              <AccordionContent>
                <SkillGroup
                  selectedSkills={selectedSkills}
                  setSelectedSkills={setSelectedSkills}
                />
              </AccordionContent>
            </AccordionItem>
          ),
        )}
      </Command>
    </Accordion>
  );
}
