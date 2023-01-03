const axios = require("axios");

async function sendData(data) {
  console.log("sending");
  const res = await axios.post("http://localhost:4000/createUser", data);
  console.log(res);
}

sendData({ name: "liam", password: "pass" });
