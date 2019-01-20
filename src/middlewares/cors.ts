import { Context } from "koa";

export default async (ctx: Context, next: Function) => {
  ctx.set("Access-Control-Allow-Origin", "*");
  ctx.set("Access-Control-Allow-Headers", "*");
  ctx.set("Access-Control-Allow-Methods", "*");
  await next();
};
