import Router from "koa-router";
import { Chat, User } from "../controller";

const router = new Router();

router.post("/join", User.add);
router.post("/login", User.login);

// get user info
router.get("/user", User.getInfo);
router.get("/user/:id", User.get);

router.get("/friends", User.getFriends);
router.post("/friend/:id", User.addFriends);

// get chat list
router.get("/chat", Chat.get);
// add chat
router.post("/chat/:id", Chat.add);
// read chat
router.patch("/chat/:id", Chat.read);

export default router;
