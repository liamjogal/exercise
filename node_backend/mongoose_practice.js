// const mongoose = require("mongoose");
import * as mongoose from "mongoose";

mongoose.set("strictQuery", true);

function register(name, passw, privStat) {
  const user_uri =
    "mongodb+srv://ljogz:bGl7AhkvCWdXWWPZ@cluster0.i0fm5wf.mongodb.net/User_Info?retryWrites=true&w=majority";
  mongoose.connect(user_uri, console.log("Mongodb User_Info connected :)"));

  const registerSchema = mongoose.Schema({
    username: String,
    password: String,
    privacy: String,
  });

  const loginModel = mongoose.model("loginModel", registerSchema, "logins");

  const newUser = new loginModel({
    username: name,
    password: passw,
    privacy: privStat,
  });
  newUser.save(function (err, model) {
    if (err) console.log(err);
    else console.log(model.username + " was registered");
  });
}

// when registering the status will default to private
register("lemons", "lemonade", "private");
