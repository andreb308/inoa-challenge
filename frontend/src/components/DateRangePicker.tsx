"use client";

import * as React from "react";
import { ChevronDownIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { ptBR } from "react-day-picker/locale";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { FormAtivos } from "@/App";
import { subDays } from "date-fns";

export default function Calendar22({
  type,
  stateSetter,
}: {
  type: "start" | "end";
  stateSetter: React.Dispatch<React.SetStateAction<FormAtivos>>;
}) {
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState<Date | undefined>(undefined);
  const threeMonthsAgo = subDays(new Date(), 90);

  const handleDateChange = (selectedDate: Date | undefined) => {
    if (type === "start") {
      stateSetter((prev: any) => ({
        ...prev,
        startDate: selectedDate,
      }));
    } else {
      stateSetter((prev: any) => ({
        ...prev,
        endDate: selectedDate,
      }));
    }
    setDate(selectedDate);
    setOpen(false);
  };

  return (
    <div className="flex flex-col gap-3">
      <Label htmlFor="date" className="px-1">
        Data de {type === "start" ? "Início" : "Fim"}
      </Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id="date"
            className="w-48 justify-between font-normal"
          >
            {date ? date.toLocaleDateString() : "Selecione..."}
            <ChevronDownIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="single"
            //pt-br
            locale={ptBR}
            selected={date}
            disabled={{ before: threeMonthsAgo, after: new Date() }}
            // captionLayout="dropdown"
            onSelect={handleDateChange}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
