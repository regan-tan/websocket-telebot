const TelegramBot = require('node-telegram-bot-api');

const token = '7811457686:AAFZoTo29h33kfVApYPyLD0RkD-MlOWrKE8';

const bot = new TelegramBot(token, {
    polling: true
});

bot.on('message', function(msg) {
    console.log('Received a message');

    const res = `Hi ${msg.from.first_name}! I have received your message: ${msg.text}`;

    bot.sendMessage(msg.chat.id, res);
});

