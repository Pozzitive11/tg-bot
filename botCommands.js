const User = require("./models");
const { gameOptions, againOptions } = require("./options");

const startGame = async (chatId, bot, chats) => {
  await bot.sendMessage(chatId, "Guess which number from 0 to 9 I guessed");
  const randomNumber = Math.floor(Math.random() * 10);
  chats[chatId] = randomNumber;
  await bot.sendMessage(chatId, `Guess`, gameOptions);
};

const startCommand = async (chatId, bot) => {
  const user = await User.findOne({ chatId: chatId });
  if (!user) {
    user = new User({ chatId });
    await user.save();
    console.log("New user has been created.");
  }
  await bot.sendSticker(
    chatId,
    "https://ant.combot.org/ss/Smonkey/08f2408fdc3f41b77401fe9d305d1bdebf9b3c4e196303a9564ac76f926662903da4976f04cd1e107fecc0b1232315a828b1641bd97ca83dd0b1be39cbe6ca1b80th.png"
  );
  await bot.sendMessage(chatId, "Welcome to the bot");
};

const infoCommand = async (chatId, bot, msg) => {
  const user = await User.findOne({ chatId: chatId });
  if (user) {
    await bot.sendMessage(
      chatId,
      `Your name is ${msg.from.first_name}. You have ${user.right} correct and ${user.wrong} incorrect answers.`
    );
  } else {
    await bot.sendMessage(
      chatId,
      "I can't find your information. Have you started a conversation with /start?"
    );
  }
};

module.exports = { startCommand, infoCommand, startGame };
