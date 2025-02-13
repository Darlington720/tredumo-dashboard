import io from "socket.io-client";
import urls from "../api/apiConstants";

const socketEndpoint = urls.baseUrl1;

const socket = io(socketEndpoint);

export default socket;
