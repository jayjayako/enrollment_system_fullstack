const express = require("express");
const app = express();
app.disable("x-powered-by");
app.set("trust proxy", true);

app.use(express.json());

const connectDB = require("./modulelibrary/mongodbconn");
connectDB();

const initializesuperadmin = require("./modulelibrary/initsuperadmin");

// setTimeout(initializesuperadmin, 7000);

var sessionMiddleware = require("./modulelibrary/sessionconfig");
app.use(sessionMiddleware);

const https = require("https");
const fs = require("fs");

const options = {
  key: fs.readFileSync("C:/yourpath/server.key"), // Update with the path to your private key file
  cert: fs.readFileSync("C:/yourpath/server.crt"), // Update with the path to your certificate file
};

const server = https.createServer(options, app);

const port = 443; // Use the default HTTPS port

const io = require("socket.io")(server, { cors: { origin: "*" } });

server.listen(port, (err) => {
  if (err) {
    return console.log("ERROR", err);
  }
  console.log(`Listening on port...${port}`);
});

///////////// to wrap express session auth inside socket //////////
const wrap = (middleware) => (socket, next) =>
  middleware(socket.request, {}, next);
io.use(wrap(sessionMiddleware));
///////////////////////////////////////////////////////////////////

////////////////// use for realtime connection ////////////////////
var { iofunc } = require("./socketauth/ioinside.js");
iofunc(io);
var { socketfunct } = require("./extrasocket/socketinside.js");
///////////////////////////////////////////////////////////////////

/////////////////// socket connection instance /////////////////
io.on("connection", (socket) => {
  console.log(`Socket ${socket.id} connected`);
  socketfunct(socket);
  app.socket = socket.on("disconnect", () => {
    console.log(`Socket ${socket.id} disconnected`);
    socket.disconnect(true);
  });
});
////////////////////////////////////////////////////////////////
var routes = require("./routes");

function getfilespath(req, res, next) {
  res.locals.absolutepath = __dirname;
  next();
}

app.use("/api", getfilespath, routes);

///////////////// express static views frontend ////////////////
app.use(express.static("views"));
app.use("/views", express.static(__dirname + "views"));
////////////////////////////////////////////////////////////////
