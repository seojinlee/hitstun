const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

mongoose.set('useCreateIndex', true)

mongoose.connect('mongodb+srv://seojin0404:gbjEc2B2iD5r@hitstun.5oqta.mongodb.net/', {
 useNewUrlParser: true,
 useUnifiedTopology: true
}, (err, res) => {
  if (err) {
    console.log(err)
  }
  else {
    console.log('Connected to mongodb.')
  }
});

const app = express();

//Middleware
app.use(bodyParser.json());
app.use(cors());

const api = require('./routes/api');

app.use('/api/', api)


const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));