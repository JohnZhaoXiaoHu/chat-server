import jwt from "jsonwebtoken";
import config from "../config";
const { secret, expires } = config;

export default function(_id: string) {
  return jwt.sign(
    {
      exp: Math.floor(Date.now() / 1000 + expires),
      _id
    },
    secret
  );
}
