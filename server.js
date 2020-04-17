const express = require('express');
var rp = require('request-promise');
const usersRepository = require('./DataAccess/usersRepository');
usersRepository.inserUser('Yair');

const app = express();
const url = 'https://itunes.apple.com/search?term=';
app.get('/api/songs/:artistName', (req, res) => {


  rp(url + req.params.artistName + '&limit=25')

    .then(function (response) {
      res.send(response);
    })
    .catch(function (err) {
      console.log(err)
    });
});

const port = 5000;

app.listen(port, () => `Server running on port ${port}`);