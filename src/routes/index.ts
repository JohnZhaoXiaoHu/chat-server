import Router from "koa-router";
import { Sign, Chat, User } from "../controller";

const router = new Router();

router.post("/user", Sign.join);
router.post("/login", Sign.login);

// get user info
router.get("/user/:id", User.get);

// add chat
router.get("/chat", Chat.get);
router.post("/chat/:id", Chat.add);

export default router;
