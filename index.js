const { againOptions } = require("./options");
const { startCommand, infoCommand, startGame } = require("./botCommands");
const User = require("./models");
const connectDB = require("./db");
const TelegramApi = require("node-telegram-bot-api");
require("dotenv").config();


const bot = new TelegramApi(process.env.TELEGRAM_BOT_TOKEN, { polling: true });
const chats = {};
const start = async () => {
  try {
    bot.setMyCommands([
      { command: "/start", description: "Start greeting" },
      { command: "/info", description: "Info about user" },
      { command: "/game", description: "Guess number game" },
    ]);

    bot.on("message", async (msg) => {
      try {
        const text = msg.text;
        const chatId = msg.chat.id;
        if (text === "/start") {
          return await startCommand(chatId, bot);
        }
        if (text === "/info") {
          return await infoCommand(chatId, bot, msg);
        }
        if (text === "/game") {
          return await startGame(chatId, bot, chats);
        }
        return await bot.sendMessage(chatId, "Unknown message");
      } catch (error) {
        return await bot.sendMessage(chatId, "Unknown error");
      }
    });

    bot.on("callback_query", async (msg) => {
      const data = msg.data;
      const chatId = msg.message.chat.id;
      const user = await User.findOne({ chatId: chatId });
      if (data === "/again") {
        return startGame(chatId, bot, chats);
      }
      if (!user) {
        return await bot.sendMessage(
          chatId,
          "Please start the game with /start"
        );
      }
      if (data == chats[chatId]) {
        user.right += 1;
        await bot.sendMessage(chatId, `You guessed it!!!`, againOptions);
      } else {
        user.wrong += 1;
        await bot.sendMessage(
          chatId,
          `Try again. Bot guessed the number ${chats[chatId]}`,
          againOptions
        );
      }
      await user.save();
    });
  } catch (error) {
    console.log(error);
  }
};
connectDB();
start();
