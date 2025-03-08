// This is the main server file for tele bot

const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config();

const token = process.env.TELEGRAM_TOKEN;

const bot = new TelegramBot(token, {
    polling: true
});

// // Respond to any message of any kind
// bot.on('message', function(msg) {
//     console.log('Received a message');

//     const res = `Hi ${msg.from.first_name}! I have received your message: ${msg.text}`;

//     bot.sendMessage(msg.chat.id, res);
// });

// Create an ECHO command
bot.onText(/\/echo (.+)/, function(msg, match) {
    console.log("Received an echo request");
    
    const data = match[1];

    bot.sendMessage(msg.chat.id, data);
});

// Create a GREET command
bot.onText(/\/greet (.+)/, function(msg, match) {
    console.log("Received a greeting");

    const res = `Hello ${match[1]}, how are you doing?`

    bot.sendMessage(msg.chat.id, res);
});

// Create a ball command
bot.onText(/\/ball (.+)/, function(msg, match) {
    console.log("Received ball request from Telegram");
    
    // console.log(match[1]);
    const coordinates = match[1].split(' ');
    const xpos = parseFloat(coordinates[0]);
    const ypos = parseFloat(coordinates[1]);
    const coordObj = {
      x: xpos,
      y: ypos
    }
    
    // Broadcast that message to all connected clients
    wsServer.clients.forEach(function (client) {
      client.send(JSON.stringify(coordObj));
    });
});


// WEBSOCKET SERVER PART

const WebSocket = require('ws');
const PORT = 5001;
const wsServer = new WebSocket.Server({
    port: PORT
});

wsServer.on('connection', function (socket) {
    // Some feedback on the console
    console.log("A client just connected");

    // Attach some behavior to the incoming socket
    socket.on('message', function (msg) {
        console.log("Received message from client: " + msg)
        // socket.send("Take this back: " + msg)

        try {
            let parsedMsg = JSON.parse(msg); // Ensure it's an object
            
            // Broadcast the parsed message correctly
            wsServer.clients.forEach(function (client) {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(JSON.stringify(parsedMsg)); // Send a proper JSON string
                }
            });
        } catch (error) {
            console.error("Error parsing received message:", error);
        }
    });
  });

console.log( (new Date()) + " Server is listening on port " + PORT);