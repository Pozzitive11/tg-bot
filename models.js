const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  chatId: {
    type: String,
    unique: true,
    required: true
  },
  right: {
    type: Number,
    default: 0 // Використовуйте 'default', а не 'defaultValue'
  },
  wrong: {
    type: Number,
    default: 0 // Те саме тут
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
