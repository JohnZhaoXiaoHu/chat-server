import Http from "http";
import Koa from "koa";
// import * as jwt from "koa-jwt";
import koaBody from "koa-body";
import cors from "./middlewares/cors";
import router from "./routes";
import "./models";

const app = new Koa();
const server = Http.createServer(app.callback());

// app.use(jwt({ secret: "shared-secret" }).unless({ path: [/^\/public/] }));
app.use(koaBody());

app.use(cors);

app.use(router.routes()).use(router.allowedMethods());

server.listen(8080, () => {
  console.log("server is running");
});
