const express = require("express");
const cors = require("cors");
const socket = require("socket.io");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
require("./config/mongoose.config");
require("./routes/pet.routes")(app);
const server = app.listen(8000, () => {
  console.log("Listening at Port 8000");
});

const io = socket(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["*"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  socket.on("getDataFromReact", (data) => {
    console.log("at server everything is ok");
    io.emit("toClient", data);
  });
});
