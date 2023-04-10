const express = require("express");
const {
  getAllPosts,
  getPost,
  getPostComments,
  createPost,
  addCommentToPost,
  updatePostTitle,
  updatePostBody,
  deletePost,
} = require("../../controllers/posts");

const postRouter = express.Router();

postRouter.get("/posts", getAllPosts);
postRouter.get("/posts/:id", getPost);
// get comments for specific post
postRouter.get("/posts/:id/comments", getPostComments);
postRouter.post("/posts", createPost);
// add comment for specific post
postRouter.post("/posts/:id/comments", addCommentToPost);
postRouter.patch("/posts/:id/title", updatePostTitle);
postRouter.patch("/posts/:id/body", updatePostBody);
postRouter.delete("/posts/:id", deletePost);

module.exports = postRouter;
