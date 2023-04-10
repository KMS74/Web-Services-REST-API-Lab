const commentModel = require("../models/comment");

commentModel;
const getAllComments = (req, res) => {
  commentModel
    .find()
    .then((comments) => res.status(200).json({ message: "ok", comments }))
    .catch((err) => res.status(500).json({ message: err.message }));
};

const getComment = (req, res) => {
  const id = req.params.id;
  commentModel
    .findById(id)
    .then((comment) => {
      if (!comment) {
        return res.status(404).json({ message: "Comment not found" });
      }
      res.status(200).json({ message: "ok", comment });
    })
    .catch((err) => res.status(500).json({ message: err.message }));
};

const createComment = (req, res) => {
  const commentData = { ...req.body };
  const comment = new commentModel(commentData);
  comment
    .save()
    .then((comment) => res.status(201).json({ message: "created", comment }))
    .catch((err) => res.status(500).json({ message: err.message }));
};

// update by replace whole document on comments
const updateComment = async (req, res) => {
  const id = req.params.id;
  const updatedCommentData = { ...req.body };
  console.log(updatedCommentData);
  // The new: true option ensures that the updated post is returned in the response.
  commentModel
    .findByIdAndUpdate(id, updatedCommentData, { new: true })
    .then((comment) => {
      if (!comment) {
        return res.status(404).json({ message: "Comment not found" });
      }
      res.status(200).json({ message: "updated", comment });
    })
    .catch((err) => res.status(500).json({ message: err.message }));
};

const deleteComment = (req, res) => {
  const id = req.params.id;
  commentModel
    .findByIdAndDelete(id)
    .then((comment) => {
      if (!comment) {
        return res.status(404).json({ message: "Comment not found" });
      }
      res.status(200).json({ message: "deleted", comment });
    })
    .catch((err) => res.status(500).json({ message: err.message }));
};

module.exports = {
  getAllComments,
  getComment,
  createComment,
  updateComment,
  deleteComment,
};
