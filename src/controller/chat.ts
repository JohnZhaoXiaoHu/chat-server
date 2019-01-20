import { BaseContext } from "koa";
import { Chat } from "../models";

export default class ChatController {
  public static async add(ctx: BaseContext) {
    const { id } = ctx.params;
    let { content } = ctx.request.body;
    content = content.trim();
    const from = ctx.request.header.authorization.split(" ")[1];
    const to = id;

    const chat = new Chat({
      to,
      from,
      content,
      chat_id: [from, to].sort().join("_")
    });

    try {
      const savedChat = await chat.save();
      ctx.response.status = 201;
      ctx.body = savedChat;
    } catch (err) {
      ctx.response.status = 500;
      ctx.body = "存储失败";
    }
  }

  public static async get(ctx: BaseContext) {
    const userId = ctx.request.header.authorization.split(" ")[1];

    try {
      const chatList = await Chat.find({
        $or: [{ from: userId }, { to: userId }]
      });
      ctx.body = chatList;
    } catch (err) {
      ctx.response.status = 500;
      ctx.body = "查找失败";
    }
  }
}
