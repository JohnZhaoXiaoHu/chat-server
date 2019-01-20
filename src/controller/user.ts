import { Context } from "koa";
import { User } from "../models";

export default class UserController {
  public static async get(ctx: Context) {
    const { id } = ctx.params;
    try {
      const user = await User.findById(id, { password: 0 });
      if (!user) {
        ctx.body = "未找到用户信息";
        ctx.response.status = 400;
        return;
      }

      ctx.body = user;
      return;
    } catch (err) {
      ctx.body = "服务器错误";
      ctx.response.status = 500;
      return;
    }
  }
}
