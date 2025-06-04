"use client";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Settings, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface FloatingButtonProps {
  onClick: () => void;
}

export function FloatingButton({ onClick }: FloatingButtonProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            onClick={onClick}
            size="icon"
            className={cn(
              "fixed bottom-4 right-4 h-14 w-14 rounded-full shadow-lg z-50",
              "bg-primary hover:bg-primary/90 text-primary-foreground",
              "hover:scale-105 transition-all duration-200 ease-in-out",
              "ring-4 ring-primary/20 hover:ring-primary/30",
              "animate-in slide-in-from-bottom-4 fade-in duration-300"
            )}
          >
            <div className="flex flex-col items-center justify-center">
              <ChevronUp className="h-4 w-4" />
              <Settings className="h-3 w-3 -mt-0.5" />
            </div>
          </Button>
        </TooltipTrigger>
        <TooltipContent side="left" className="font-medium">
          <p>Open Panel</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
