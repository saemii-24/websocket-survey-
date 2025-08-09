import { createServer } from "http";
import { parse } from "url";
import next from "next";
import { Server } from "socket.io";

const port = parseInt(process.env.PORT || "3000", 10);
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

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
