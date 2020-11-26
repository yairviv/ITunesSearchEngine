const express = require('express');
var rp = require('request-promise');
const usersRepository = require('./DataAccess/usersRepository');
var bodyParser = require('body-parser')
var bcrypt = require('bcrypt')

const app = express();
app.use(bodyParser.json())
const url = 'https://itunes.apple.com/search?term=';
app.get('/api/songs/:artistName', (req, res) => {
  let finalUrl = url + req.params.artistName;
  if (req.params.artistName.limit !== undefined) {
    finalUrl = finalUrl + `&limit=${req.params.artistName.limit}`
  }
  if (req.params.artistName.entity !== undefined) {
    finalUrl = finalUrl + `&entity=${req.params.artistName.entity}`
  }
  rp(finalUrl)
    .then(function (response) {
      res.send(response);
    })
    .catch(function (err) {
      console.log(err)
    });
});

app.post('/api/users', async (req, res) => {
  try {
    const salt = await bcrypt.genSalt();
    const hashedPass = await bcrypt.hash(req.body.user.password, salt);
    req.body.user.password = hashedPass;

    usersRepository.inserUser(req.body.user).then(function (response) {
      console.log('inser user: ' + req.body.userName)
      res.send(response);
    })
      .catch(function (err) {
        console.log(err)
      });
  } catch (err) {
    return res.status(501).send();
  }
});

app.post('/api/login', async (req, res) => {
  let users = await usersRepository.getUser(req.body.user.userName);
  if (!users || users.length == 0) {
    return res.status(400).send('Cannot find  user');
  }
  let dbPass = users[0].userPassword;
  bcrypt.compare(req.body.user.password, dbPass).then(function (result) {
    if (result == true) {
      return res.status(200).send('Success');
    } else {
      return res.status(501).send('Not Allowed');
    }
  });
});


const port = 5000;

app.listen(port, () => `Server running on port ${port}`);