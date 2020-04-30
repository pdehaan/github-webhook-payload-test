const bodyParser = require("body-parser");
const express = require("express");

const middlewares = require("./middlewares");

require("dotenv").config();

const app = express();
app.use(bodyParser.json());

app.post("/r/:owner/:repo", middlewares.verifyHookData, (req, res) => {
  res.send(`Hello, ${req.params.owner}/${req.params.repo}`);

  const payload = req.body;
  console.log(payload.action);
  console.log("\t", "repository:", payload.repository.full_name);
  console.log("\t", "html_url:", payload.issue.html_url);
  console.log("\t", "number:", payload.issue.number);
  console.log("\t", "title:", payload.issue.title);
  console.log("\t", "body:", payload.issue.body);
  console.log("\t", "user.login:", payload.issue.user.login);
  console.log("\t", "created_at:", new Date(payload.issue.created_at));
  // console.log("\t", "labels:", payload.issue.labels);
  console.log("\t", "state:", payload.issue.state);
});

app.use((err, req, res, next) => {
  if (err) console.error(err);
  res.status(403).send("Request body was not signed or verification failed");
});

app.listen(process.env.PORT);
