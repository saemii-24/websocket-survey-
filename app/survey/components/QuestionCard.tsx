"use client";

import { useState } from "react";
import { Button } from "../../../components/ui/button";
import { cn } from "../../../lib/utils";

interface QuestionCardProps {
  question: string;
  options: string[];
  onAnswer: (answer: string, index: number) => void;
  isSubmitting?: boolean;
}

export default function QuestionCard({
  question,
  options,
  onAnswer,
  isSubmitting = false,
}: QuestionCardProps) {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const handleSelect = (index: number) => {
    setSelectedOption(index);
  };

  const handleSubmit = () => {
    if (selectedOption !== null) {
      onAnswer(options[selectedOption], selectedOption);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-white rounded-lg border border-gray-200 p-8 shadow-sm">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
          {question}
        </h2>

        <div className="space-y-3 mb-8">
          {options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleSelect(index)}
              className={cn(
                "w-full p-4 text-left rounded-lg border-2 transition-all duration-200",
                "hover:border-blue-300 hover:bg-blue-50",
                selectedOption === index
                  ? "border-blue-500 bg-blue-100 text-blue-900"
                  : "border-gray-200 bg-gray-50 text-gray-700"
              )}
            >
              <div className="flex items-center">
                <div
                  className={cn(
                    "w-4 h-4 rounded-full border-2 mr-3 flex-shrink-0",
                    selectedOption === index
                      ? "border-blue-500 bg-blue-500"
                      : "border-gray-300"
                  )}
                >
                  {selectedOption === index && (
                    <div className="w-2 h-2 bg-white rounded-full m-auto mt-0.5" />
                  )}
                </div>
                <span className="font-medium">{option}</span>
              </div>
            </button>
          ))}
        </div>

        <div className="text-center">
          <Button
            onClick={handleSubmit}
            disabled={selectedOption === null || isSubmitting}
            size="lg"
            className="px-8"
          >
            {isSubmitting ? "제출 중..." : "다음 단계"}
          </Button>
        </div>
      </div>
    </div>
  );
}
