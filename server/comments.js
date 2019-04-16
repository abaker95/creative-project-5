const mongoose = require('mongoose');
const express = require("express");
const router = express.Router();
const auth = require("./auth.js");

const users = require("./users.js");
const User = users.model;

const passages = require("./passages.js");
const Passage = passages.model;

var ObjectId = require('mongoose').Types.ObjectId; 

const commentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  passage: {
      type: mongoose.Schema.ObjectId,
      ref: 'Passage'
  },
  comment: String,
  created: {
    type: Date,
    default: Date.now
  },
});

const Comment = mongoose.model('Comment', commentSchema);

// add comment
router.post("/", auth.verifyToken, User.verify, async (req, res) => {
  // check parameters
  const comment = new Comment({
      user: req.user,
      passage: req.body.passage,
      comment: req.body.comment,
      created: req.body.date,
  });

  try {
    await comment.save();
    return res.send(comment);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

// get all comments for passage by passage id
router.get("/:id", async (req, res) => {
  try {
    let comments = await Comment.find({"passage": new ObjectId(req.params.id)}).populate("user");
    return res.send(comments);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

module.exports = {
  model: Comment,
  routes: router,
}