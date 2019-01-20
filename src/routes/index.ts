import Router from "koa-router";
import { Chat, User } from "../controller";

const router = new Router();

router.post("/join", User.new);
router.post("/login", User.login);

// get user info
router.get("/user", User.auth);
router.get("/user/:id", User.get);

// add chat
router.get("/chat", Chat.get);
router.post("/chat/:id", Chat.add);

export default router;
