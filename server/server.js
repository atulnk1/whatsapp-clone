const express = require('express');
const app = express();
const http = require('http');
const httpServer = http.createServer(app);
const io = require("socket.io")(httpServer, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"]
    }
});

io.on('connection', socket => {
    // static id that we get from the client (like your phone number)
    const id = socket.handshake.query.id
    socket.join(id)
    // Whenever we send a message from the client, it will come here
    // This will take in all the recipients and the text we want to send them
    socket.on('send-message', ({ recipients, text }) => {
        recipients.forEach(recipient => {
            // removing the current recipient from the list of recipients 
            const newRecipients = recipients.filter( r => r !== recipient)
            // we are adding the sender to the list of recipients
            newRecipients.push(id)
            // broadcasting the message to the current recipient as they are
            // the only one in that room so you send them the list of newReceipients without their
            // own id in it along with the text and the sender id
            socket.broadcast.to(recipient).emit('receive-message', {
                recipients: newRecipients, sender: id, text
            })
        })
    })
})

httpServer.listen(5001, () => {
  console.log('listening on *:5001');
});