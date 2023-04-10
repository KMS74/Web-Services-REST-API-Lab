const commentModel = require("../models/comment");
const postModel = require("../models/post");

const getAllPosts = (req, res) => {
  postModel
    .find()
    .then((posts) => res.status(200).json({ message: "ok", posts }))
    .catch((err) => res.status(500).send("Error: " + err));
};

const getPost = (req, res) => {
  const id = req.params.id;
  postModel
    .findById(id)
    .then((post) => {
      if (!post) return res.status(404).json({ message: "Post not found" });
      res.status(200).json({ message: "ok", post });
    })
    .catch((err) => res.status(500).json({ message: err.message }));
};

//  fetching comments that belongs to a specific post
//  /posts/:id/comments
//  /posts/1/comments
const getPostComments = async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await postModel.findById(postId).populate("comments");
    if (!post) return res.status(404).json({ message: "Post not found" });

    res.status(200).json({ comments: post.comments, message: "ok" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//  add a comment to specific post
//  /posts/:id/comments
//  /posts/1/comments
const addCommentToPost = async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await postModel.findById(postId);
    if (!post) return res.status(404).json({ message: "Post not found" });

    const comment = new commentModel({
      text: req.body.text,
      author: req.body.author,
      post: post._id,
    });

    await comment.save();
    post.comments.push(comment);
    await post.save();

    res.status(201).json({ message: "created", comment });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createPost = (req, res) => {
  const postData = { ...req.body };
  const post = new postModel(postData);
  post
    .save()
    .then((post) => res.status(201).json({ message: "created", post }))
    .catch((err) => res.status(500).json({ message: err.message }));
};

//  Handle partial update on posts
//  Update Post Title
const updatePostTitle = (req, res) => {
  const id = req.params.id;
  const updatedPostTitle = req.body.title;
  postModel
    .findByIdAndUpdate(id, { title: updatedPostTitle }, { new: true })
    .then((post) => {
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }
      res.status(200).json({ message: "updated", post });
    })
    .catch((err) => res.status(500).json({ message: err.message }));
};

//  Update Post Body
const updatePostBody = (req, res) => {
  const id = req.params.id;
  const updatedPostBody = req.body.body;
  postModel
    .findByIdAndUpdate(id, { body: updatedPostBody }, { new: true })
    .then((post) => {
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }
      res.status(200).json({ message: "updated", post });
    })
    .catch((err) => res.status(500).json({ message: err.message }));
};

const deletePost = (req, res) => {
  const id = req.params.id;
  postModel
    .findByIdAndDelete(id)
    .then((post) => {
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }
      res.status(200).json({ message: "deleted", post });
    })
    .catch((err) => res.status(500).json({ message: err.message }));
};

module.exports = {
  getAllPosts,
  getPost,
  getPostComments,
  addCommentToPost,
  createPost,
  updatePostTitle,
  updatePostBody,
  deletePost,
};
