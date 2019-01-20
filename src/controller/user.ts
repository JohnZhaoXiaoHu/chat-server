import { Context, BaseContext } from "koa";
import { User } from "../models";
import { md5, validator, createToken } from "../utils";

export default class UserController {
  public static async auth(ctx: BaseContext) {
    const { user } = ctx.state;
    try {
      ctx.body = await User.findById(user._id, { password: 0 });
    } catch (err) {
      ctx.body = "未找到用户信息";
      ctx.response.status = 500;
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

      ctx.body = createToken(user._id);
      ctx.response.status = 201;
      return;
    } catch (err) {
      ctx.body = "登录失败";
      ctx.response.status = 500;
      return;
    }
  }

  public static async new(ctx: BaseContext) {
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

      ctx.body = createToken(savedUser._id);
      ctx.response.status = 201;
    } catch (err) {
      console.log(err);
      ctx.response.status = 500;
      ctx.body = "注册失败！";
    }
  }

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
