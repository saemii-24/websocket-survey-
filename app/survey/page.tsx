"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "../../components/ui/button";

export default function SurveyPage() {
  const [isJoining, setIsJoining] = useState(false);
  const router = useRouter();

  const handleStartSurvey = () => {
    setIsJoining(true);

    console.log("설문조사 시작");

    // 첫 번째 단계로 이동
    setTimeout(() => {
      router.push("/survey/1");
    }, 1000);
  };
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">🗳️ 실시간 설문조사</h1>
        <p className="text-lg text-gray-600 mb-8">
          몇 가지 간단한 질문에 답해주세요.
          <br />
          실시간으로 다른 참여자들의 응답을 확인할 수 있습니다.
        </p>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <h3 className="font-semibold text-blue-900 mb-2">설문 정보</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• 총 5개의 질문</li>
            <li>• 예상 소요 시간: 3-5분</li>
            <li>• 실시간 결과 공유</li>
          </ul>
        </div>

        <Button
          size="lg"
          onClick={handleStartSurvey}
          disabled={isJoining}
          className="text-lg px-8 py-6"
        >
          {isJoining ? "참여 중..." : "설문조사 시작하기"}
        </Button>
      </div>
    </main>
  );
}
