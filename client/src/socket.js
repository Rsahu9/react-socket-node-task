import io from "socket.io-client";

export const socket = io("http://127.0.0.1:8000/chat");

export const news = io("http://127.0.0.1:8000/news");

export const bot = io("http://127.0.0.1:8000/bot");