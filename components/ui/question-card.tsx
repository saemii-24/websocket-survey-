"use client";

import { useState } from "react";
import * as RadioGroup from "@radix-ui/react-radio-group";
import { Button } from "./button";

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
  const [selectedValue, setSelectedValue] = useState<string>("");

  const handleSubmit = () => {
    if (selectedValue) {
      const index = options.indexOf(selectedValue);
      onAnswer(selectedValue, index);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-white rounded-lg border border-gray-200 p-8 shadow-sm">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
          {question}
        </h2>

        <RadioGroup.Root
          value={selectedValue}
          onValueChange={setSelectedValue}
          className="space-y-3 mb-8"
        >
          {options.map((option, index) => (
            <div key={index} className="flex items-center space-x-3">
              <RadioGroup.Item
                value={option}
                id={`option-${index}`}
                className="w-5 h-5 bg-white border-2 border-gray-300 rounded-full hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 data-[state=checked]:border-blue-500 data-[state=checked]:bg-blue-500"
              >
                <RadioGroup.Indicator className="flex items-center justify-center w-full h-full relative after:content-[''] after:w-2 after:h-2 after:rounded-full after:bg-white" />
              </RadioGroup.Item>
              <label
                htmlFor={`option-${index}`}
                className="text-gray-700 font-medium cursor-pointer flex-1 p-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                {option}
              </label>
            </div>
          ))}
        </RadioGroup.Root>

        <div className="text-center">
          <Button
            onClick={handleSubmit}
            disabled={!selectedValue || isSubmitting}
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
