const express = require('express');
const mongodb = require('mongodb');
const mongoose = require('mongoose');

const Character = require('../models/Character')
const Card = require('../models/Card')
const Stage = require('../models/Stage')

const router = express.Router();

//Characters
router.post('/characters', async (req, res) => {
  create(Character, req, res)
});
router.get('/characters', async (req, res) => {
  getAll(Character, req, res)
});
router.get('/characters/:id', async (req, res) => {
  getOne(Character, req, res)
});
router.delete('/characters', async (req, res) => {
  deleteAll(Character, req, res)
});
router.delete('/characters/:id', async (req, res) => {
  deleteOne(Character, req, res)
});

// router.put('/characters/:name', async (req, res) => {
//   try {
//     const card = await Card.findOne({name: "Dash Attack Updated"});
//     const character = await Character
//       .findOneAndUpdate({name: req.params.name}, {
//         $push: {cards: card._id},
//       },{new: true})
//       .populate('cards');
//     console.log('-----');
//     console.log(character.cards[0].name);

//     character.cards.push()
//     res.status(201).send(character);
//   } catch (err) {
//     console.log(err)
//     res.status(400).send(err.errmsg);
//   }
// });



//Cards
router.post('/cards', async (req, res) => {
  create(Card, req, res)
});
router.get('/cards', async (req, res) => {
  getAll(Card, req, res)
});
router.get('/cards/:id', async (req, res) => {
  getOne(Card, req, res)
});
router.delete('/cards', async (req, res) => {
  deleteAll(Card, req, res)
});
router.delete('/cards/:id', async (req, res) => {
  deleteOne(Card, req, res)
});

//Stages
router.post('/stages', async (req, res) => {
  create(Stage, req, res)
});
router.get('/stages', async (req, res) => {
  getAll(Stage, req, res)
});
router.get('/stages/:id', async (req, res) => {
  getOne(Stage, req, res)
});
router.delete('/stages', async (req, res) => {
  deleteAll(Stage, req, res)
});
router.delete('/stages/:id', async (req, res) => {
  deleteOne(Stage, req, res)
});


async function create(Model) {
  try {
    const collection = await Model.create(req.body);
    res.status(201).send(collection);
  } catch (err) {
    console.log(err)
    res.status(400).send(err.errmsg);
  }
}

async function getAll(Model, req, res) {
  try {
    const collection = await Model.find({});
    res.send(collection);
  } catch (err) {
    console.log(err)
    res.status(400).send(err.errmsg);
  }
}
async function getOne(Model, req, res) {
  try {
    const collection = await Model.findOne({_id: req.params.id});
    res.send(collection);
  } catch (err) {
    console.log(err)
    res.status(400).send(err.errmsg);
  }
}

async function deleteAll(Model, req, res) {
  try {
    await Model.collection.drop();
    res.sendStatus(200);
  } catch (err) {
    console.log(err)
    res.status(400).send(err.errmsg);
  }  
}
async function deleteOne(Model, req, res) {
  try {
    await Model.deleteOne({_id: req.params.id});
    res.sendStatus(200);
  } catch (err) {
    console.log(err)
    res.status(400).send(err.errmsg);
  }
}


module.exports = router;