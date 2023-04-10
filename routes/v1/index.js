const express = require("express");
const commentsRouter = require("./comments");
const postsRouter = require("./posts");
const v1Router = express.Router();

// All APIs V1 Routes
v1Router.use("/v1", commentsRouter);
v1Router.use("/v1", postsRouter);

module.exports = v1Router;
