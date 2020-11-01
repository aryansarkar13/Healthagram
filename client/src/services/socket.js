import socketIOClient from "socket.io-client";
import keys from "keys/keys";
const endpoint = keys.socketEndPoint;
const socket = socketIOClient(endpoint);
socket.on("connect", () => {
  console.log("Client is connected to server");
});
export default socket;
