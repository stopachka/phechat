import css from "../css/app.css"
import "phoenix_html"
import {Socket, Presence} from "phoenix"

const user = document.getElementById("user").innerText;
const socket = new Socket("/socket", {params: {user}});
socket.connect()
