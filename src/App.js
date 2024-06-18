import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import routes from "./routes/routes.js";

class App {
  constructor() {
    this.app = express();
    this.server = http.createServer(this.app);
    this.io = new Server(this.server, {
      cors: {
        origin: "*",
      },
    });
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(cors());
  }

  routes() {
    this.app.use(routes);
  }
}

export default new App();
