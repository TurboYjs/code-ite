const express = require("express");
const cors = require("cors");
const app = express();
const server = require("http").Server(app);
const cookieParser = require("cookie-parser");
console.log(process.env.NODE_ENV)
//env file
require("dotenv").config({
  path: process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : '.env'
});
//cors and parser
app.use(cors({
  cors: {
    origin: ['http://localhost:5001','https://guxukai.tech'],
    methods: ["GET", "POST"],
    transports: ['websocket', 'polling'],
    credentials: true
  },
  allowEIO3: true
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const useRouter = require("./router");
app.use("/api", useRouter);

//socket yaha hai
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});
require("./socket/socketEditorAdapter")(io);

server.listen(process.env.PORT || 5001, () => {
  console.log(`http://localhost:${process.env.PORT || 5001}`);
});
// /etc/nginx/ssl
// guxukai.tech_bundle.crt  guxukai.tech_bundle.pem  guxukai.tech.csr  guxukai.tech.key