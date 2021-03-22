const express = require('express');
const mongodb = require('mongodb');
const request = require('request');

const router = express.Router();


async function loadCollection(collection) {
  const client = await mongodb.MongoClient.connect
  ('mongodb+srv://seojin0404:gbjEc2B2iD5r@hitstun.5oqta.mongodb.net/', {
    useNewUrlParser: true
  });

  return client.db('hitstun').collection(collection);
}

module.exports = router;