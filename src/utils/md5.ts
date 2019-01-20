import crypto from "crypto";

function md5(str: string) {
  return crypto
    .createHash("md5")
    .update(str)
    .digest("hex");
}

function compare(str: string, hash: string) {
  return (
    crypto
      .createHash("md5")
      .update(str)
      .digest("hex") === hash
  );
}

md5.compare = compare;

export default md5;
