"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "../../../components/ui/button";

interface SurveyResult {
  questionId: number;
  question: string;
  results: {
    option: string;
    count: number;
    percentage: number;
  }[];
}

// 예시 결과 데이터
const mockResults: SurveyResult[] = [
  {
    questionId: 1,
    question: "당신의 연령대는 어떻게 되시나요?",
    results: [
      { option: "10대", count: 5, percentage: 10 },
      { option: "20대", count: 25, percentage: 50 },
      { option: "30대", count: 15, percentage: 30 },
      { option: "40대", count: 3, percentage: 6 },
      { option: "50대 이상", count: 2, percentage: 4 },
    ],
  },
  {
    questionId: 2,
    question: "가장 선호하는 프로그래밍 언어는 무엇인가요?",
    results: [
      { option: "JavaScript", count: 20, percentage: 40 },
      { option: "Python", count: 15, percentage: 30 },
      { option: "Java", count: 8, percentage: 16 },
      { option: "TypeScript", count: 5, percentage: 10 },
      { option: "기타", count: 2, percentage: 4 },
    ],
  },
];

export default function SurveyResultPage() {
  const router = useRouter();
  const [results, setResults] = useState<SurveyResult[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 결과 로딩 시뮬레이션
    setTimeout(() => {
      setResults(mockResults);
      setIsLoading(false);
    }, 1500);
  }, []);

  if (isLoading) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-24">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>결과를 불러오는 중...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="w-full max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">🎉 설문조사 완료!</h1>
          <p className="text-lg text-gray-600">
            실시간으로 업데이트되는 결과를 확인해보세요
          </p>
        </div>

        <div className="space-y-8">
          {results.map((result, index) => (
            <div
              key={result.questionId}
              className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm"
            >
              <h3 className="text-xl font-semibold mb-4">
                Q{index + 1}. {result.question}
              </h3>

              <div className="space-y-3">
                {result.results.map((option, optionIndex) => (
                  <div key={optionIndex} className="flex items-center">
                    <div className="w-1/3 text-sm font-medium text-gray-700">
                      {option.option}
                    </div>
                    <div className="w-1/2 bg-gray-200 rounded-full h-4 mx-4">
                      <div
                        className="bg-blue-600 h-4 rounded-full transition-all duration-500"
                        style={{ width: `${option.percentage}%` }}
                      />
                    </div>
                    <div className="w-16 text-sm text-gray-600 text-right">
                      {option.count}명 ({option.percentage.toFixed(1)}%)
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8 space-x-4">
          <Button variant="outline" onClick={() => router.push("/survey")}>
            다시 참여하기
          </Button>
          <Button onClick={() => router.push("/")}>홈으로 돌아가기</Button>
        </div>
      </div>
    </main>
  );
}
