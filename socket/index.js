export default function(server) {
  const io = require('socket.io')(server)

  io.on('connection', client => {})
}
