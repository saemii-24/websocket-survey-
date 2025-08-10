"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { socket } from "../client";
import { cn } from "../lib/utils";
import { Button } from "../components/ui/button";

export default function Home() {
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    // 연결 성공 시
    socket.on("connect", () => {
      console.log("Connected to server");
      setIsConnected(true);
    });

    // 연결 해제 시
    socket.on("disconnect", () => {
      console.log("Disconnected from server");
      setIsConnected(false);
    });

    // 이미 연결되어 있는 경우
    if (socket.connected) {
      setIsConnected(true);
    }

    // 컴포넌트 언마운트 시 이벤트 리스너 정리
    return () => {
      socket.off("connect");
      socket.off("disconnect");
    };
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-8">WebSocket 연결 테스트</h1>

        <div
          className={cn(
            "text-2xl font-semibold p-4 rounded-lg border transition-all duration-300",

            {
              "bg-green-100 text-green-800 border-green-300 shadow-green-200 shadow-lg":
                isConnected,
              "bg-red-100 text-red-800 border-red-300 shadow-red-200 shadow-lg":
                !isConnected,
            }
          )}
        >
          {isConnected ? "🟢 소켓이 연결되었습니다!" : "🔴 소켓 연결 중..."}
        </div>

        {isConnected && (
          <p className={cn("mt-4 text-gray-600", "animate-fade-in")}>
            서버와 실시간 통신이 가능합니다.
          </p>
        )}
        {isConnected && (
          <div className="mt-8">
            <Button size="lg" onClick={() => router.push("/survey")}>
              설문조사 참여하기
            </Button>
          </div>
        )}
      </div>
    </main>
  );
}
