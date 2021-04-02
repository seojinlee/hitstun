const http = require('http');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);

//Set static folder
app.use('/bulma', express.static(path.join(__dirname, '../node_modules/bulma/css')));
app.use('/fa', express.static(path.join(__dirname, '../node_modules/font-awesome/css')));
app.use('/mdi', express.static(path.join(__dirname, '../node_modules/@mdi/font/css')));
app.use('/fonts', express.static(__dirname + '/node_modules/font-awesome/fonts'));
app.use(express.static(path.join(__dirname, 'public')))

//Socket.io
const io = socketio(server, {
  cors: {
    origin: 'http://localhost:8080',
    methods: ['GET', 'POST ']
  }
});

//Connect to MongoDB
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

//Middleware
app.use(bodyParser.json());
app.use(cors());

const api = require('./routes/api');
const admin = require('./routes/admin');

app.use('/api', api)
app.use('/admin', admin)

require('./socket/socket')(io)

const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`Server started on port ${port}`));