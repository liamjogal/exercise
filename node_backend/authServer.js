const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const port = 4000;
const corsOrigin = {
  origin: "http://localhost:3000", //or whatever port your frontend is using
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOrigin));
app.use(express.json());

mongoose.set("strictQuery", true);

const user_uri =
  "mongodb+srv://ljogz:bGl7AhkvCWdXWWPZ@cluster0.i0fm5wf.mongodb.net/User_Info?retryWrites=true&w=majority";
mongoose.connect(user_uri, console.log("Mongodb User_Info connected :)"));

const db = mongoose.connection;

const excerciseSchema = mongoose.Schema({
  date: Date,
  exercise: Number,
  weight: Number,
  reps: Number,
  sets: Number,
});

// Shchema and model for intial registration
const userSchema = mongoose.Schema({
  username: String,
  password: String,
  privacy: String,
  excercises: {
    Squats: {
      date: Date,
      exercise: Number,
      weight: Number,
      reps: Number,
      sets: Number,
    },
  },
});

const userModel = mongoose.model("userModel", userSchema, "logins");

// Schema and model for workout document
const workoutSchema = mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  date: Date,
  exercise: Number,
  weight: Number,
  reps: Number,
  sets: Number,
});

const workoutModel = mongoose.model("workoutModel", workoutSchema, "workouts");
// used for incripting password
const bcrypt = require("bcrypt");

// function to register a user
function register(name, passw, privStat) {
  const newUser = new userModel({
    username: name,
    password: passw,
    privacy: privStat,
    excercises: { squats: {}, deadlifts: {} },
  });
  newUser.save(function (err, model) {
    if (err) console.log(err);
    else console.log(model.username + " was registered");
  });
}

// REGISTER A USER
app.post("/createUser", async (req, res) => {
  const body = req.body;
  console.log(`body ${body.name}`);
  userModel.findOne({ username: body.name }).exec((err, person) => {
    if (err) {
      res.status(400);
      return console.log(error);
    }
    if (person != null) {
      //console.log("username already in database");
      res.status(422).send("username already exists");
      return;
    } else {
      register(body.name, body.password, "private");
      console.log("success");
      res.status(201).send("sucess");
      return;
    }
  });
});

app.get("/createUser", async (req, res) => {
  res.send("create user api");
});

app.get("/login", async (req, res) => {
  //console.log(req);
  const query = req.query;
  userModel
    .findOne({
      username: query.name,
      password: query.password,
    })
    .exec((err, person) => {
      if (err) {
        res.status(400).send(err);
        return console.log("error");
      }
      if (person == null) {
        console.log("invalid login");
        res.status(404).send("user credentials are invalid");
      } else {
        console.log(`logged in ${query.name}`);
        console.log(person);
        res.status(200).send(person);
      }
    });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
