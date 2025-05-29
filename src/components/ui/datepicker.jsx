"use client";

import * as React from "react";
import { format, getYear, getMonth, setMonth, setYear } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/utils/classname";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

const parseDate = (dateString) => {
  const [year, month, day] = dateString.split("-").map(Number);
  return new Date(year, month - 1, day);
};

export function DatePickerDemo({ startYear, endYear, dob, onChangeDob }) {
  const start = startYear !== undefined ? startYear : getYear(new Date()) - 100;
  const end = endYear !== undefined ? endYear : getYear(new Date()) + 100;

  const [date, setDate] = React.useState(dob ? parseDate(dob) : new Date());

  React.useEffect(() => {
    if (dob) {
      setDate(parseDate(dob));
    }
  }, [dob]);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const years = Array.from({ length: end - start + 1 }, (_, i) => start + i);

  const handleMonthChange = (month) => {
    const newDate = setMonth(date, months.indexOf(month));
    setDate(newDate);
    if (onChangeDob) {
      onChangeDob(format(newDate, "yyyy-MM-dd"));
    }
  };

  const handleYearChange = (year) => {
    const newDate = setYear(date, parseInt(year, 10));
    setDate(newDate);
    if (onChangeDob) {
      onChangeDob(format(newDate, "yyyy-MM-dd"));
    }
  };

  const handleSelect = (selectedDate) => {
    if (selectedDate) {
      setDate(selectedDate);
      if (onChangeDob) {
        onChangeDob(format(selectedDate, "yyyy-MM-dd"));
      }
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-start text-left font-normal",
            !date && "text-muted-foreground",
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "dd-MM-yyyy") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="end">
        <div className="flex justify-between space-x-2 p-2">
          <Select
            onValueChange={handleMonthChange}
            value={months[getMonth(date)]}
          >
            <SelectTrigger className="w-[110px]">
              <SelectValue placeholder="Month" />
            </SelectTrigger>
            <SelectContent>
              {months.map((month) => (
                <SelectItem key={month} value={month}>
                  {month}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            onValueChange={handleYearChange}
            value={getYear(date).toString()}
          >
            <SelectTrigger className="w-[110px]">
              <SelectValue placeholder="Year" />
            </SelectTrigger>
            <SelectContent>
              {years.map((year) => (
                <SelectItem key={year} value={year.toString()}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleSelect}
          initialFocus
          month={date}
          onMonthChange={setDate}
        />
      </PopoverContent>
    </Popover>
  );
}
