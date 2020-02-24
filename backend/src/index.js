const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");
const cors = require("cors");
const http = require("http");

const { setupWebSocket } = require("./websocket");

mongoose.connect("mongodb://localhost:27017/omnistack", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const app = express();
const server = http.Server(app);

setupWebSocket(server);

app.use(cors());
app.use(express.json());
app.use(routes);

server.listen(3333);
