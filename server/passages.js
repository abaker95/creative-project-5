const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const router = express.Router();
const auth = require("./auth.js");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

const users = require("./users.js");
const User = users.model;

// Create a scheme for items in database
const passageSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    title: String,
    passage: String,
    author: String,
    work: String,
    speaker: String,
    contributer: String,
    created: {
        type: Date,
        default: Date.now
    }
});

// Create a model for passages in the database.
const Passage = mongoose.model('Passage', passageSchema);

// Create a new item in the database
router.post('/',auth.verifyToken, User.verify, async (req, res) => {
    if (!req.body.title || !req.body.passage || !req.body.author || !req.body.work ||
        !req.body.speaker || !req.user)
        return res.status(400).send({
            message: "Must fill in all parameters."
    });
    const passage = new Passage({
        title: req.body.title,
        passage: req.body.passage,
        author: req.body.author,
        work: req.body.work,
        speaker: req.body.speaker,
        user:req.user
    });
    try {
        await passage.save();
        res.send(passage);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

// get my passages
router.get("/", auth.verifyToken, User.verify, async (req, res) => {
    // return passages
    try {
      let passages = await Passage.find({
        user: req.user
      }).sort({
        created: -1
      });
      return res.send(passages);
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
  });

// Get a list of all of the passages in the database
router.get("/all", async (req, res) => {
    try {
        //let passages = await Passage.find();
        let passages = await Passage.find().sort({
            created: -1
            }).populate('user');
        res.send(passages);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

// Delete a passage from the database
router.get('/:id', async (req, res) => {
    try {
        id = req.params.id
        console.log(id);
        let passage = await Passage.findById(id).populate('user');
        res.send(passage);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

// Delete a passage from the database
router.delete('/:id', auth.verifyToken, User.verify, async (req, res) => {
    try {
        id = req.params.id
        console.log(id);
        await Passage.findByIdAndDelete(id);
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

// Update the details of a passage in the database
router.put(':id', auth.verifyToken, User.verify, async (req, res) => {
    try {
        let passage = await Passage.findById(req.params.id);
        passage.title = req.body.title;
        passage.passage = req.body.passage;
        passage.author = req.body.author;
        passage.work = req.body.work;
        passage.speaker = req.body.work;
        await passage.save();
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

module.exports = {
    model: Passage,
    routes: router,
  }