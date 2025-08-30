const HTTPResponseBuilder = require("./utils/HTTPResponseBuilder");
const handlers = require("./handlers");

exports.handler = async function (event, context) {
  let { body, isBase64Encoded } = event;

  if (isBase64Encoded) body = Buffer.from(body).toString("utf-8");

  try {
    body = JSON.parse(body);
  } catch (error) {
    return new HTTPResponseBuilder()
      .setStatusCode(400)
      .setBody({ message: "invalid request body" });
  }

  const { action, payload } = body;

  console.log("action called: ", action);

  const handler = handlers[action];

  if (handler) return handler(payload);
  else
    return new HTTPResponseBuilder()
      .setStatusCode(400)
      .setBody({ message: "invalid action" })
      .build();
};
