const express = require('express');
const mongodb = require('mongodb');
const mongoose = require('mongoose');

const Room = require('../models/Room')
const Character = require('../models/Character')
const Card = require('../models/Card')
const Stage = require('../models/Stage')

const router = express.Router();

//TEMP ROUTE
router.post('/createRoom', async (req, res) => {
  try {
    const room = await Room.create(req.body);
    res.status(201).send(room);
  } catch (err) {
    console.log(err)
    res.status(400).send(err.errmsg);
  }
});
router.delete('/createRoom', async (req, res) => {
  try {
    await Room.collection.drop();
    res.sendStatus(200);
  } catch (err) {
    console.log(err)
    res.status(400).send(err.errmsg);
  }
});
////////////

router.get('/room', async (req, res) => {
  const room = await Room.findOne({});
  res.send(room);
});

router.get('/room/:name', async (req, res) => {
  try {
    const roomName = req.params.name;
    const room = await Room
      .findOne({room: roomName})
      .populate({
        path: 'players',
        populate: {
          path: 'p1',
          populate: 'character'
        },
      })
      .populate({
        path: 'players',
        populate: {
          path: 'p2',
          populate: 'character'
        },
      })
      .populate({
        path: 'players',
        populate: {
          path: 'p1',
          populate: {
            path: 'character',
            populate: 'cards'
          }
        },
      })
      .populate({
        path: 'players',
        populate: {
          path: 'p2',
          populate: {
            path: 'character',
            populate: 'cards'
          }
        },
      }).
      populate('stage');
    res.send(room);
  } catch (err) {
    console.log(err)
    res.status(400).send(err.errmsg);
  }
});


router.post('/room', async (req, res) => {
  const room = await Room.findOne();
  if (!room) {
    room = await Room.create();
  }

  const {user, spectator} = req.body;

  if (spectator) {
    room.spectators = user;
  }
  else {
    if (room.players.length > 1) {
      res.status(400).send("There are already 2 players in the game.");
    }
    else {
      room.players.push({name: user});
    }
    await room.save();
    res.send(room);
  }
});

router.get('/characters', async (req, res) => {
  try {
    const characters = await Character.find({});
    res.send(characters);
  } catch (err) {
    console.log(err);
    res.status(400).send(err.errmsg);
  }
});
router.get('/characters/:_id', async (req, res) => {
  try {
    const character = await Character
      .findOne({_id: req.params._id})
      .populate('cards');
    res.send(character);
  } catch (err) {
    console.log(err);
    res.status(400).send(err.errmsg);
  }
});

router.get('/stages', async (req, res) => {
  try {
    const stages = await Stage.find({});
    res.send(stages);
  } catch (err) {
    console.log(err)
    res.status(400).send(err.errmsg);
  }
});
router.get('/stages/:id', async (req, res) => {
  try {
    const stageId = req.params.id;
    const stage = await Stage.findOne({_id: stageId});
    res.send(stage);
  } catch (err) {
    console.log(err)
    res.status(400).send(err.errmsg);
  }
});

router.post('/createGame', async (req, res) => {
  try {
    const {roomName, players, stage} = req.body;
    console.log('creating game')
    const room = await Room
      .findOneAndUpdate({room: roomName}, {
        stage: stage,
        players: players
      }, {new: true});

      res.send(201);

  } catch (err) {
    console.log(err)
    res.status(400).send(err.errmsg);
  }
});

module.exports = router;