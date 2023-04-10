const mongoose = require("mongoose");
const commentSchema = new mongoose.Schema({
  text: { type: String, required: true },
  author: { type: String, required: true },
  post: { type: mongoose.Schema.Types.ObjectId, ref: "post" },
});

const commentModel = mongoose.model("comment", commentSchema);

module.exports = commentModel;
