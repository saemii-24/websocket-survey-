"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import ProgressBar from "../../../components/ui/progress-bar";
import QuestionCard from "../../../components/ui/question-card";

// 예시 설문 데이터
const surveyQuestions = [
  {
    id: 1,
    question: "당신의 연령대는 어떻게 되시나요?",
    options: ["10대", "20대", "30대", "40대", "50대 이상"],
  },
  {
    id: 2,
    question: "가장 선호하는 프로그래밍 언어는 무엇인가요?",
    options: ["JavaScript", "Python", "Java", "TypeScript", "기타"],
  },
  {
    id: 3,
    question: "개발 경력은 얼마나 되시나요?",
    options: ["1년 미만", "1-3년", "3-5년", "5-10년", "10년 이상"],
  },
  {
    id: 4,
    question: "주로 어떤 분야에서 개발하시나요?",
    options: [
      "웹 프론트엔드",
      "웹 백엔드",
      "모바일",
      "데이터 사이언스",
      "기타",
    ],
  },
  {
    id: 5,
    question: "이 설문조사는 어떠셨나요?",
    options: ["매우 만족", "만족", "보통", "불만족", "매우 불만족"],
  },
];

export default function SurveyStepPage() {
  const router = useRouter();
  const params = useParams();
  const stepNumber = parseInt(params.step as string);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(
    surveyQuestions[stepNumber - 1]
  );

  useEffect(() => {
    // 잘못된 단계 번호 처리
    if (stepNumber < 1 || stepNumber > surveyQuestions.length) {
      router.push("/survey");
      return;
    }

    setCurrentQuestion(surveyQuestions[stepNumber - 1]);
  }, [stepNumber, router]);

  const handleAnswer = (answer: string, index: number) => {
    setIsSubmitting(true);

    console.log("답변:", answer, "인덱스:", index, "단계:", stepNumber);

    // 다음 단계로 이동 또는 결과 페이지로 이동
    setTimeout(() => {
      if (stepNumber < surveyQuestions.length) {
        router.push(`/survey/${stepNumber + 1}`);
      } else {
        router.push("/survey/result");
      }
    }, 1000);
  };

  if (!currentQuestion) {
    return <div>Loading...</div>;
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="w-full max-w-4xl mx-auto">
        <ProgressBar
          currentStep={stepNumber}
          totalSteps={surveyQuestions.length}
        />

        <QuestionCard
          question={currentQuestion.question}
          options={currentQuestion.options}
          onAnswer={handleAnswer}
          isSubmitting={isSubmitting}
        />

        <div className="text-center mt-6">
          <button
            onClick={() => router.push("/survey")}
            className="text-gray-500 hover:text-gray-700 text-sm"
          >
            ← 처음으로 돌아가기
          </button>
        </div>
      </div>
    </main>
  );
}
