const express = require('express');
var rp = require('request-promise');
const usersRepository = require('./DataAccess/usersRepository');

const app = express();
const url = 'https://itunes.apple.com/search?term=';
app.get('/api/songs/:artistName', (req, res) => {
  let finalUrl = url + req.params.artistName;
  if (req.params.artistName.limit !== undefined) {
    finalUrl = finalUrl + `limit=${req.params.artistName.limit}`
  }
  if (req.params.artistName.entity !== undefined) {
    finalUrl = finalUrl + `entity=${req.params.artistName.entity}`
  }
  rp(finalUrl)
    .then(function (response) {
      res.send(response);
    })
    .catch(function (err) {
      console.log(err)
    });
});

app.get('/api/users/:userName', (req, res) => {
  usersRepository.inserUser(req.params.userName).then(function (response) {
    console.log('inser user: ' + req.params.userName)
    res.send(response);
  })
    .catch(function (err) {
      console.log(err)
    });
});

const port = 5000;

app.listen(port, () => `Server running on port ${port}`);