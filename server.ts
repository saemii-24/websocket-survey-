import { createServer } from "http";
import { parse } from "url";
import next from "next";
import { Server } from "socket.io";
import fs from "fs";
import path from "path";

const port = parseInt(process.env.PORT || "3000", 10);
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const DATA_PATH = path.join(__dirname, "survey-results.json");

app.prepare().then(() => {
  // HTTP 서버 생성
  const server = createServer((req, res) => {
    const parsedUrl = parse(req.url!, true);
    handle(req, res, parsedUrl);
  });

  // Socket.io 서버 생성
  const io = new Server(server);

  // 클라이언트가 연결되었을 때의 처리
  io.on("connection", (socket) => {
    console.log("A user connected");

    // 설문 결과 집계 및 전송
    socket.on("survey-result-get", () => {
      let results = [];
      if (fs.existsSync(DATA_PATH)) {
        try {
          results = JSON.parse(fs.readFileSync(DATA_PATH, "utf-8"));
        } catch (e) {
          results = [];
        }
      }

      // 설문 질문 및 옵션 정의
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

      // 집계 결과 생성
      const aggregated = surveyQuestions.map((q, idx) => {
        const optionCounts = q.options.map(option => ({
          option,
          count: 0,
        }));

        results.forEach((answerObj: Record<number, string>) => {
          const answer = answerObj[idx];
          const optionIdx = q.options.indexOf(answer);
          if (optionIdx !== -1) {
            optionCounts[optionIdx].count += 1;
          }
        });

        const total = optionCounts.reduce((sum, o) => sum + o.count, 0);

        return {
          questionId: q.id,
          question: q.question,
          results: optionCounts.map(o => ({
            ...o,
            percentage: total ? (o.count / total) * 100 : 0,
          })),
        };
      });

      socket.emit("survey-result-get", aggregated);
    });
    socket.on("survey-result", (answer) => {
      let results = [];
      if (fs.existsSync(DATA_PATH)) {
        try {
          results = JSON.parse(fs.readFileSync(DATA_PATH, "utf-8"));
        } catch (e) {        
          results = [];
        }
      }
      results.push(answer);
      fs.writeFileSync(DATA_PATH, JSON.stringify(results, null, 2));
      console.log("Survey result saved:", answer);
    });


    // 연결 종료 시 처리
    socket.on("disconnect", () => {
      console.log("A user disconnected");
    });
  });

  // 서버 시작
  server.listen(port, () => {
    console.log(
      `> Server listening at http://localhost:${port} as ${
        dev ? "development" : process.env.NODE_ENV
      }`
    );
  });
});