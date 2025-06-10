"use client";

import { Button } from "../ui/button";

export function ConnectionFilter({
  filterText,
  activeButton,
  setActiveButton,
}) {
  return (
    <div className="flex flex-row flex-wrap items-center justify-center gap-1 md:justify-start lg:gap-2">
      {Object.entries(filterText).map(([key, text], index) => (
        <ConnectionFilterButton
          key={key}
          text={text}
          active={activeButton === index}
          handleClick={() => setActiveButton(index)}
        />
      ))}
    </div>
  );
}

function ConnectionFilterButton({ text, active, handleClick }) {
  const options = active
    ? "bg-ss-red-505 hover:bg-ss-red-404 dark:bg-ss-red-404 dark:hover:bg-ss-red-404/60 text-ss-light-555"
    : "bg-ss-light-222 hover:bg-ss-light-333 dark:bg-ss-black-444 dark:hover:bg-ss-black-131";
  return (
    <Button
      className={`text-ss-black-121 dark:text-ss-light-555 h-8 w-fit rounded-4xl px-5 text-sm hover:cursor-pointer lg:h-10 lg:text-base ${options}`}
      onClick={handleClick}
    >
      {text}
    </Button>
  );
}
