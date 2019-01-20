import { BaseContext } from "koa";
import { User } from "../models";
import { md5, validator } from "../utils";

export default class SignController {
  public static async join(ctx: BaseContext) {
    let { username, password } = ctx.request.body;

    username = username.trim().toLowerCase();
    password = password.trim();

    if ([username, password].some(value => !value)) {
      ctx.body = "信息输入不完整";
      ctx.response.status = 400;
      return;
    }

    if (!validator.isUsername(username)) {
      ctx.body = "用户名非法";
      ctx.response.status = 400;
      return;
    }

    const sameUser = await User.findOne({ username });
    if (sameUser) {
      if (sameUser.username === username) {
        ctx.body = "用户名重复";
        ctx.response.status = 400;
        return;
      }

      ctx.response.status = 400;
      return;
    }

    const user = new User({
      username,
      password: md5(password)
    });
    try {
      const savedUser = await user.save();
      ctx.response.status = 201;
      ctx.body = savedUser;
    } catch (err) {
      console.log(err);
      ctx.response.status = 500;
      ctx.body = "注册失败！";
    }
  }

  public static async login(ctx: BaseContext) {
    let { username, password } = ctx.request.body;

    username = username.trim().toLowerCase();
    password = password.trim();

    if ([username, password].some(value => !value)) {
      ctx.body = "信息输入不完整";
      ctx.response.status = 400;
      return;
    }

    try {
      const user = await User.findOne(
        { username, password: md5(password) },
        { password: 0 }
      );
      if (!user) {
        ctx.body = "用户名密码输入错误";
        ctx.response.status = 400;
        return;
      }

      ctx.body = user;
      return;
    } catch (err) {
      ctx.body = "登录失败";
      ctx.response.status = 500;
      return;
    }
  }
}
