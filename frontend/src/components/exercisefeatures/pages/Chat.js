import "react-chat-elements/dist/main.css";
import { MessageBox, MessageList } from "react-chat-elements";
import { Input } from "react-chat-elements";
import { Button } from "react-chat-elements";
import { useState, useEffect } from "react";
import axios from "axios";
export default function Chat() {
  // var [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  var [messages, setMessages] = useState([]);

  const [send, setSend] = useState(0);

  useEffect(() => {
    const fetchGPT = async () => {
      const response = await fetch(`http://localhost:4000/idea?req=${input}`);
      const data = await response.json();
      setMessages((prevChatLog) => [
        ...prevChatLog,
        {
          position: "left",
          type: "text",
          text: data.content,
        },
      ]);
      console.log(data);
    };
    if (input !== "") {
      setMessages([
        ...messages,
        {
          position: "right",
          type: "text",
          title: "You",
          text: input,
        },
      ]);
      fetchGPT();
    }
  }, [send]);

  return (
    <>
      <MessageList
        className="message-list"
        // toBottomHeight={"100%"}
        lockable={true}
        dataSource={messages}
      />
      <div style={{ position: "fixed", bottom: "0%", right: "20%" }}>
        <Input
          placeholder="Type here..."
          multiline={true}
          onChange={(val) => {
            setInput(val.target.value);
            console.log(input);
          }}
          rightButtons={
            <Button
              text={"Send"}
              onClick={() => {
                setSend(send + 1);
              }}
            >
              Send
            </Button>
          }
        />
      </div>
    </>
  );
}
