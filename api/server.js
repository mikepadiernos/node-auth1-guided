const express   = require("express");
const session   = require("express-session");
const helmet    = require("helmet");
const cors      = require("cors");

const usersRouter = require("../users/users-router.js");
const authRouter = require("../auth/auth-router.js")

const server = express();

const sessionConfig = {
  name: 'chocolate-chip',
  secret: 'secret',
  cookie: {
    maxAge: 3600 * 1000,
    secure: false,
    httpOnly: true
  },
  resave: false,
  saveUnitialized: false
}
server.use(helmet());
server.use(express.json());
server.use(cors());
server.use(session(sessionConfig));

server.use("/api/users", usersRouter);
server.use("/api/auth", authRouter);

server.get("/", (req, res) => {
  res.json({ api: "up" });
});

module.exports = server;
