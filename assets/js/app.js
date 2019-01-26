import "phoenix_html"
import {Socket, Presence} from "phoenix"
import css from "../css/app.css"
import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
  componentDidMount() {
    const user = "Stopa";
    const socket = new Socket("/socket", {params: {user}});
    socket.connect()
  }
  render() {
    return <div>hello world</div>
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root-container')
);
