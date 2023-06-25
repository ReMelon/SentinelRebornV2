const { Schema, model } = require("mongoose");

const User = new Schema({
  id: { type: String, unique: true, required: true },
  wallet: { type: Number, default: 0 },
  bank: { type: Number, default: 0 },
  cooldowns: {
      work: { type: Date },
      beg: { type: Date },
      daily: { type: Date }
  }
});

module.exports = new model("User", User, "User");


