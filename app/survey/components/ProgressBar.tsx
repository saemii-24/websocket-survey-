"use client";

import * as Progress from "@radix-ui/react-progress";
import { cn } from "../../../lib/utils";

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

export default function ProgressBar({
  currentStep,
  totalSteps,
}: ProgressBarProps) {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="w-full max-w-md mx-auto mb-8">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-700">진행률</span>
        <span className="text-sm font-medium text-gray-700">
          {currentStep} / {totalSteps}
        </span>
      </div>

      <Progress.Root
        className="relative overflow-hidden bg-gray-200 rounded-full w-full h-3"
        value={progress}
      >
        <Progress.Indicator
          className={cn(
            "w-full h-full bg-blue-600 transition-transform duration-500 ease-out",
            progress === 100 && "bg-green-600"
          )}
          style={{ transform: `translateX(-${100 - progress}%)` }}
        />
      </Progress.Root>

      <div className="text-center mt-2">
        <span className="text-xs text-gray-500">
          {progress.toFixed(0)}% 완료
        </span>
      </div>
    </div>
  );
}
