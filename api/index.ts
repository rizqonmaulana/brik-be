import express from "express";
import app from "../src";

const server = express();
server.use("/", app);

export default app;