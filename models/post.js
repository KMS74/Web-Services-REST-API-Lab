const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "comment" }],
});

const postModel = mongoose.model("post", postSchema);

module.exports = postModel;
