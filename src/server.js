import app from "./App.js";
import "./socket/socket.js";

app.server.listen(3000, () => {
  console.log("Servidor online!");
});
