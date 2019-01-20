import SocketIO from "socket.io";
import { Server } from "http";

export default function(server: Server) {
  const io = SocketIO(server);

  io.on("connection", client => {});
}
