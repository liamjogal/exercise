import "react-chat-elements/dist/main.css";
import { MessageBox, MessageList } from "react-chat-elements";
import { Input } from "react-chat-elements";
import { Button } from "react-chat-elements";
import { useState } from "react";
import axios from "axios";
export default function Chat() {
  // var [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  var [messages, setMessages] = useState([]);

  const handleSubmit = async () => {
    console.log(input);
    messages.push({ position: "right", text: input });
    // setMessages([...messages, { position: "right", text: input }]);
    await axios.get(`http://localhost:4000/idea?req=${input}`).then(
      (res) => {
        console.log(res);
        setMessages([
          ...messages,
          { position: "left", text: res.data.content },
        ]);
        // messages.push({ position: "left", text: res.data.content });
      },
      (err) => {
        console.log(err);
      }
    );
  };
  return (
    <>
      {messages.map((val) => {
        console.log(val);
        if (val.position === "left") {
          return (
            <MessageBox
              position={"left"}
              type={"text"}
              title={"ChatGPT"}
              text={val.text}
            />
          );
        } else {
          return (
            <MessageBox
              position={"right"}
              type={"text"}
              title={"You"}
              text={val.text}
            />
          );
        }
      })}
      <div style={{ position: "fixed", bottom: "0%", right: "20%" }}>
        <Input
          placeholder="Type here..."
          multiline={true}
          onChange={(val) => {
            setInput(val.target.value);
            console.log(input);
          }}
        />
      </div>
      <div style={{ position: "fixed", bottom: "0%", right: "15%" }}>
        <Button text={"Send"} onClick={handleSubmit} title="Send" />
      </div>
      ;
    </>
  );
}
