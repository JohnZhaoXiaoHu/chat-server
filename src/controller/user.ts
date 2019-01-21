import { Context, BaseContext } from "koa";
import { User, Friend } from "../models";
import { md5, validator, createToken, Id } from "../utils";

export default class UserController {
  public static async getInfo(ctx: BaseContext) {
    const { target } = ctx.state;
    try {
      ctx.body = await User.findById(target._id, { password: 0 });
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
      ctx.response.status = 422;
      return;
    }

    try {
      const user = await User.findOne(
        { username, password: md5(password) },
        { password: 0 }
      );
      if (!user) {
        ctx.body = "用户名或密码错误";
        ctx.response.status = 403;
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

  public static async add(ctx: BaseContext) {
    let { username, password } = ctx.request.body;

    username = username.trim().toLowerCase();
    password = password.trim();

    if ([username, password].some(value => !value)) {
      ctx.body = "信息输入不完整";
      ctx.response.status = 422;
      return;
    }

    if (!validator.isUsername(username)) {
      ctx.body = "用户名非法";
      ctx.response.status = 422;
      return;
    }

    const hasSame = await User.findOne({ username });
    if (hasSame) {
      ctx.body = "用户名重复";
      ctx.response.status = 422;
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
        ctx.response.status = 404;
        return;
      }

      ctx.body = user;
    } catch (err) {
      ctx.body = "服务器错误";
      ctx.response.status = 500;
    }
  }

  public static async getFriends(ctx: BaseContext) {
    const { target } = ctx.state;

    try {
      const friends = await Friend.find({
        $or: [
          {
            from: target._id
            // is_approved: true
          },
          {
            to: target._id
            // is_approved: true
          }
        ]
      });

      const list = await Promise.all(
        friends.map(({ id }) =>
          User.findById(Id.filter(target._id, id), { password: 0 }).exec()
        )
      );

      ctx.body = friends.reduce((data: any, friend, idx) => {
        data[Id.filter(target._id, friend.id)] = {
          friend,
          target: list[idx]
        };
        return data;
      }, {});
    } catch (err) {}
  }

  public static async addFriends(ctx: BaseContext) {
    const { target } = ctx.state;
    const { id } = ctx.params;
    const friendId = Id.unique(target._id, id);

    const isFriend = await Friend.findOne({ id: friendId });
    if (isFriend) {
      if (isFriend.is_approved) {
        ctx.response.status = 422;
        ctx.body = "你们已经是朋友";
        return;
      }
      // TODO: modify friend doc
      return;
    }

    const friend = new Friend({
      id: friendId,
      from: target._id,
      to: id
    });

    try {
      const saved = await friend.save();
      ctx.response.status = 201;
      ctx.body = saved;
    } catch (err) {
      ctx.body = "添加失败";
      ctx.response.status = 500;
    }
  }
}
