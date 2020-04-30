const crypto = require("crypto");

require("dotenv").config();

module.exports = {
  verifyHookData,
};

// Via https://gist.github.com/stigok/57d075c1cf2a609cb758898c0b202428
function verifyHookData(req, res, next) {
  const payload = JSON.stringify(req.body);
  if (!payload) {
    return next("Request body empty");
  }

  const sig = req.get("X-Hub-Signature") || "";
  const hmac = crypto.createHmac("sha1", process.env.GH_HOOK_SECRET);
  const digest = Buffer.from(
    `sha1=${hmac.update(payload).digest("hex")}`,
    "utf8"
  );
  const checksum = Buffer.from(sig, "utf8");
  if (
    checksum.length !== digest.length ||
    !crypto.timingSafeEqual(digest, checksum)
  ) {
    return next(
      `Request body digest (${digest}) did not match X-Hub-Signature (${checksum})`
    );
  }
  return next();
}
