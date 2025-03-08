const TelegramBot = require('node-telegram-bot-api');

const token = '7811457686:AAFZoTo29h33kfVApYPyLD0RkD-MlOWrKE8';

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