const mongoose = require("mongoose");

mongoose.connect(
    "mongodb://localhost:27017/cashwave-db"
);

const historySchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    sent: {
      type: Boolean,
      required: true,
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
  });

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 5,
        maxLength: 50
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    history: [historySchema],
})

const accountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, // reference to user Model
        ref: 'User',
        required: true
    },
    balance: {
        type: Number,
        required: true
    }
})

const User = mongoose.model("User", UserSchema)
const Account = mongoose.model("Account", accountSchema);

module.exports = {
    User,
    Account
}