const express = require("express");
const cors = require("cors");
const app = express();
const port = 8080; // port 번호 설정
const bodyParser = require("body-parser");
var apiRouter = require("./routes/api");
var createError = require("http-errors");

// 서버 접속 기본 엔진 설정
const path = require("path");
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// DB
var maria = require("./config/maria");
maria.connect();

var allowlist = ["http://localhost:3000", "https://roadvs.vercel.app"];

app.use((req, res, next) => {
  console.log("Received request:", req.method, req.url);
  next();
});

app.use(
  cors((req, callback) => {
    const origin = req.header("Origin");
    // console.log("CORS Origin Check:", origin);
    const corsOptions = allowlist.includes(origin)
      ? { origin: true }
      : { origin: false };
    callback(null, corsOptions);
  })
);

//body-parser 모듈을 불러온다.
app.use(bodyParser.json()); //요청 본문을 json 형태로 파싱
app.use(bodyParser.urlencoded({ extended: false })); //

app.use("/api", apiRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

module.exports = app;
