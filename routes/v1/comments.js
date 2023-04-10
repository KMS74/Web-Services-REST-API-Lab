const express = require("express");
const {
  getAllComments,
  createComment,
  getComment,
  deleteComment,
  updateComment,
} = require("../../controllers/comments");
const commentsRouter = express.Router();

commentsRouter.get("/comments", getAllComments);
commentsRouter.get("/comments/:id", getComment);
commentsRouter.post("/comments", createComment);
commentsRouter.put("/comments/:id", updateComment);
commentsRouter.delete("/comments/:id", deleteComment);

module.exports = commentsRouter;
