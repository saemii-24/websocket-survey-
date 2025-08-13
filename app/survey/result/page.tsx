"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "../../../components/ui/button";
import { socket } from "../../../client";

interface SurveyResult {
  questionId: number;
  question: string;
  results: {
    option: string;
    count: number;
    percentage: number;
  }[];
}



export default function SurveyResultPage() {
  const router = useRouter();
  const [results, setResults] = useState<SurveyResult[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    socket.emit("survey-result-get"); // 결과 요청 

    //요청한 결과 받기
    socket.on("survey-result-get", (data) => {
      setResults(data);
      setIsLoading(false);
    });

    return () => {
      socket.off("survey-result-get");
    };
  }, []);

  console.log(results)
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
    // <main className="flex min-h-screen flex-col items-center justify-center p-24">
    //   <div className="w-full max-w-4xl mx-auto">
    //     <div className="text-center mb-8">
    //       <h1 className="text-4xl font-bold mb-4">🎉 설문조사 완료!</h1>
    //       <p className="text-lg text-gray-600">
    //         제출된 응답 목록을 확인하세요
    //       </p>
    //     </div>

    //     <div className="space-y-8">
    //       {results.map((answerObj, idx) => (
    //         <div key={idx} className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
    //           <h3 className="text-xl font-semibold mb-4">
    //             응답자 #{idx + 1}
    //           </h3>
    //           <ul className="space-y-2">
    //             {Object.entries(answerObj).map(([qIdx, value]) => (
    //               <li key={qIdx} className="text-gray-700">
    //                 <span className="font-bold">Q{Number(qIdx) + 1}:</span> {value}
    //               </li>
    //             ))}
    //           </ul>
    //         </div>
    //       ))}
    //     </div>

    //     <div className="text-center mt-8 space-x-4">
    //       <Button variant="outline" onClick={() => router.push("/survey")}>
    //         다시 참여하기
    //       </Button>
    //       <Button onClick={() => router.push("/")}>홈으로 돌아가기</Button>
    //     </div>
    //   </div>
    // </main>
    <div></div>
  );
}
