const express = require("express");

const app = express();

const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});
// add socket router
const socketRouter = require("./routes/socketRouter")(io).router;

app.use("/api/v1", socketRouter);

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", (req, res) => {
  res.render("index");
});

io.on("connection", (socket) => {
  console.log('Socket ID ===============> '+socket.id);
  // Emit the current date and time to the connected client
  const now = new Date();
  const formattedTime = now.toLocaleString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour12: true,
  });
  socket.emit('serverEvent', 'Hello from the Server! We Are Connected :)\n' + formattedTime);
});

server.listen(3001, () => {
  console.log("Server is running");
});
