import app from "../App.js";

const io = app.io;

const usuarios = [];
const mensagens = [];

io.on("connection", (socket) => {
  socket.on("entrarSala", ({ sala, nome }, callback) => {
    socket.join(sala);

    const usuario = usuarios.find(
      (usuario) => usuario.nome == nome && usuario.sala == sala
    );

    if (usuario) {
      usuario.id = socket.id;
    } else {
      usuarios.push({ sala, nome, id: socket.id });
    }

    const m = mensagens.filter((m) => m.sala == sala);

    callback(m);
  });

  socket.on("enviarMensagem", ({ mensagem, sala, nome }) => {
    mensagens.push({ mensagem, sala, nome });

    socket.to(sala).emit("receberMensagem", { mensagem, nome });
  });

  socket.on("disconnect", () => {
    console.log("Usuario " + socket.id + " se desconectou");
  });
});

// on: recebe dados
// emit: envia dados
// join: separa em 'salas'
// to: enviar dados para todos de uma 'sala'
