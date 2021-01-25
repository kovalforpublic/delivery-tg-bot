import TelegramBot, { Message } from 'node-telegram-bot-api';
import { MessageHandler } from './classes/message-handler.class';

const token = '123456789:sdfkgnslkjdfnslkdnf;qlkASD';

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});
const handler = new MessageHandler(bot);

bot.on('message', handler.onMessage);
bot.onText(/\/start/, handler.sendInfo);
bot.onText(/\/help/, handler.sendInfo);
bot.onText(/\/make_order/, handler.onMakeOrder);

/** is delivery working today */
bot.onText(/\/is_open/, handler.getShopStatus);

/** get shop options */
bot.onText(/\/get/, handler.onGetImage);

/** order status */
bot.onText(/\/status/, handler.getStatus);

/** cancel order */
bot.onText(/\/cancel/, ({chat: {id}}: Message) => handler.cancelOrder(id));

/**  with admin access only */
bot.onText(/\/completed (.+)/, handler.onCompleted);
bot.onText(/\/toggle/, handler.onToggleShopState);