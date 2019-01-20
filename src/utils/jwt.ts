import jwt from "jsonwebtoken";
import config from "../config";
const { secret, expires } = config;

export const createJWT = (username: string) => {
  const payload = {
    exp: Date.now() + expires,
    username
  };
  return jwt.sign(payload, secret);
};
