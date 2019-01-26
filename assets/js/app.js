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
    message: ""
  };
  componentDidMount() {
    this._msgInput && this._msgInput.focus();
    // const user = "Stopa";
    // const socket = new Socket("/socket", { params: { user } });
    // socket.connect();
  }
  _sendMessage() {
    alert('send!' + this.state.message);
  }
  render() {
    return (
      <div className="App">
        <div className="chat-container">
          Type something...messages will show up here :)
        </div>
        <div className="chat-actions">
          <h3 className="chat-name">{this.state.name}</h3>
          <input
            ref={x => {
              this._msgInput = x;
            }}
            type="text"
            value={this.state.message}
            onChange={e => {
              this.setState({ message: e.target.value });
            }}
            onKeyDown={e => {
              debugger
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
