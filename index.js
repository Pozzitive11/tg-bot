const TelegramApi = require("node-telegram-bot-api");
const { gameOptions, againOptions } = require("./options");
const token = "7025657224:AAHoFSE5MmCfS4TWQcIZyn3lbDb7qEwn1sU";

const bot = new TelegramApi(token, { polling: true });

const chats = {};

const startGame = async (chatId) => {
  await bot.sendMessage(chatId, "Guess which number from 0 to 9 I guessed");
  const randomNumber = Math.floor(Math.random() * 10);
  chats[chatId] = randomNumber;
  await bot.sendMessage(chatId, `Guess`, gameOptions);
};

const start = () => {
  bot.setMyCommands([
    { command: "/start", description: "Start greeting" },
    { command: "/info", description: "Info about user" },
    { command: "/game", description: "Guess number game" },
  ]);

  bot.on("message", async (msg) => {
    const text = msg.text;
    const chatId = msg.chat.id;

    if (text === "/start") {
      await bot.sendSticker(
        chatId,
        "https://ant.combot.org/ss/Smonkey/08f2408fdc3f41b77401fe9d305d1bdebf9b3c4e196303a9564ac76f926662903da4976f04cd1e107fecc0b1232315a828b1641bd97ca83dd0b1be39cbe6ca1b80th.png"
      );
      return bot.sendMessage(chatId, "Welcome to bot");
    }
    if (text === "/info") {
      return await bot.sendMessage(chatId, `Ur name ${msg.from.first_name}`);
    }
    if (text === "/game") {
      return startGame(chatId);
    }
    return await bot.sendMessage(chatId, "Unknown message");
  });

  bot.on("callback_query", async (msg) => {
    const data = msg.data;
    const chatId = msg.message.chat.id;
    if (data === "/again") {
      return startGame(chatId);
    }
    if (data == chats[chatId]) {
      return await bot.sendMessage(chatId, `You guessed it!!!`, againOptions);
    } else {
      return await bot.sendMessage(
        chatId,
        `Try again. Bot guessed the number ${chats[chatId]}`,
        againOptions
      );
    }
  });
};

start();
