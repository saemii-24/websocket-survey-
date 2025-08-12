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

    // 설문 결과 수신 및 파일 저장
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