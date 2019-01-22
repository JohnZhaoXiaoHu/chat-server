import { BaseContext } from "koa";
import { Chat } from "../models";
import { Id } from "../utils";

export default class ChatController {
  public static async read(ctx: BaseContext) {
    const { id } = ctx.params;
    const { target } = ctx.state;

    console.log(target);

    try {
      const list = await Chat.find({
        id: Id.unique(id, target._id),
        has_read: false
      });
      const savedList = await Promise.all(
        list.map(item => {
          item.has_read = true;
          return item.save();
        })
      );
      ctx.body = savedList;
    } catch (err) {
      throw err;
    }
  }

  public static async add(ctx: BaseContext) {
    const { id } = ctx.params;
    const { target } = ctx.state;
    let { content } = ctx.request.body;
    content = content.trim();
    const from = target._id;
    const to = id;

    const chat = new Chat({
      to,
      from,
      content,
      id: Id.unique(from, to)
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
    const { target } = ctx.state;

    try {
      const chatList = await Chat.find({
        $or: [{ from: target._id }, { to: target._id }]
      });

      ctx.body = chatList;
    } catch (err) {
      ctx.response.status = 500;
      ctx.body = "查找失败";
    }
  }
}
