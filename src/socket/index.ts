import SocketIO from "socket.io";
import { Server } from "http";
import { Chat } from "../models";
import { Id } from "../utils";
import { verify } from "jsonwebtoken";
import config from "../config";

const clients: any = {};

export default function(server: Server) {
  const io = SocketIO(server);

  io.use((socket, next) => {
    const { token } = socket.handshake.query;
    try {
      const { _id } = verify(token, config.secret) as { _id: string };
      socket.handshake.query._id = _id;
      return next();
    } catch (err) {
      return next(err);
    }
  });

  io.on("connection", (client: SocketIO.Socket) => {
    console.log("one connection");
    const { _id } = client.handshake.query;
    clients[_id] = client;

    client.on("chat/send", async chat => {
      try {
        const newChat = new Chat({
          ...chat,
          id: Id.unique(chat.from, chat.to)
        });
        const savedChat = await newChat.save();

        clients[savedChat.to] &&
          clients[savedChat.to].emit("chat/receive", savedChat);
        client.emit("chat/receive", savedChat);
      } catch (err) {}
    });
  });
}
