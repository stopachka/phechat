import "phoenix_html";
import { Socket, Presence } from "phoenix";
import css from "../css/app.css";
import React from "react";
import ReactDOM from "react-dom";
import _ from "lodash";

function makeNickname() {
  const firstParts = [
    "beautiful",
    "laughing",
    "strong",
    "smart",
    "handsome",
    "nice",
    "gentle",
    "kindly"
  ];
  const secondParts = [
    "zebra",
    "giraffe",
    "lion",
    "anaconda",
    "tiger",
    "dragon"
  ];
  return `${_.sample(firstParts)}-${_.sample(secondParts)}`;
}

class App extends React.Component {
  state = {
    name: makeNickname(),
    messages: [],
    newMessage: ""
  };
  componentDidMount() {
    this._msgInput && this._msgInput.focus();
    const socket = new Socket("/socket", {
      logger: (kind, msg, data) => {
        console.log(`${kind}: ${msg}`, data);
      }
    });
    socket.onOpen(ev => console.log("OPEN", ev));
    socket.onError(ev => console.log("ERROR", ev));
    socket.onClose(ev => console.log("CLOSE", ev));
    socket.connect();

    const nickname = this.state.name;
    const lobby = socket.channel("room:lobby", { name: nickname });
    lobby.join();
    lobby.on("user:entered", ({ name }) => {
      const messages = [
        ...this.state.messages,
        {
          type: "notification",
          body: `${name} joined the lobby!`
        }
      ];
      this.setState({ messages });
    });
    lobby.on("new:msg", ({ name, body }) => {
      const messages = [
        ...this.state.messages,
        {
          type: "message",
          name,
          body
        }
      ];
      this.setState({ messages });
    });
    this._sendToLobby = body => {
      lobby.push("new:msg", { name: nickname, body });
    };
  }
  _sendMessage() {
    const newMessage = this.state.newMessage.trim();
    this._sendToLobby && newMessage && this._sendToLobby(newMessage);
    this.setState({ newMessage: "" });
  }
  render() {
    return (
      <div className="App">
        <div className="chat-container">
          <pre>{JSON.stringify(this.state, null, 2)}</pre>
          Type something...messages will show up here :)
        </div>
        <div className="chat-actions">
          <h3 className="chat-name">{this.state.name}</h3>
          <input
            ref={x => {
              this._msgInput = x;
            }}
            type="text"
            value={this.state.newMessage}
            onChange={e => {
              this.setState({ newMessage: e.target.value });
            }}
            onKeyDown={e => {
              switch (e.key) {
                case "Enter":
                  this._sendMessage();
                default:
                  break;
              }
            }}
          />
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root-container"));
