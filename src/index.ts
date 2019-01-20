import http from "http";
import Koa from "koa";
import jwt from "koa-jwt";
import koaBody from "koa-body";
import cors from "./middleware/cors";
import router from "./routes";
import "./models";
import config from "./config";

const app = new Koa();

app.use(cors);

app.use(koaBody());

app.use((ctx, next) => {
  return next().catch(err => {
    console.log("error");
    if (err.status === 401) {
      ctx.status = 401;
      ctx.body = {
        ok: false,
        msg: err.originalError ? err.originalError.message : err.message
      };
    } else {
      throw err;
    }
  });
});

app.use(
  jwt({ secret: config.secret, key: "target" }).unless({
    path: [/^\/login/, /^\/join/],
    method: "OPTIONS"
  })
);

app.use(router.routes()).use(router.allowedMethods());

const server = http.createServer(app.callback());
server.listen(8080, () => {
  console.log("server is running");
});
