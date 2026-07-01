const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// const passportLocalMongoose = require("passport-local-mongoose");=>To milta hai object → plugin properly apply nahi hota

const passportLocalMongoose = require("passport-local-mongoose").default;
// passport-local-mongoose uses ES Module export (export default).
// In CommonJS (require), it returns { default: pluginFunction }.
// So `.default` is required to access the actual plugin.

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);
// you can create your User model in any way you want.
// But when you use passport-local-mongoose, it will automatically add some fields to your user database.
// Those fields are:
// 1️⃣ username → stores the user's username
// 2️⃣ hash → stores the hashed password (not the real password)
// 3️⃣ salt → stores the salt value used for hashing the password
