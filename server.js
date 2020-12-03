const express = require('express');
var rp = require('request-promise');
const usersRepository = require('./DataAccess/usersRepository');
var bodyParser = require('body-parser');
var bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config()
const app = express();
app.use(bodyParser.json());
app.use(express.json());
const url = 'https://itunes.apple.com/search?term=';

const refreshTokens = [];

app.get('/api/songs/:artistName', authenticateToken, (req, res) => {
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
    let users = await usersRepository.getUser(req.body.user.userName);
    if (users && users.length > 0) {
      return res.status(403).send('A user with the same use name is already defined');
    }
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
      const userName = req.body.user.userName;
      const user = { userName: userName };
      const accessToken = generateAccessToken(user);
      const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
      refreshTokens.push(refreshToken);
      res.json({ accessToken: accessToken, refreshToken: refreshToken });
    } else {
      return res.status(501).send('Not Allowed');
    }
  });
});

app.post('/api/token', (req, res) => {
  const refreshToken = req.body.token;
  if (refreshToken == null) {
    return res.status(401).send('No token in request');
  }
  if (refreshTokens.includes(refreshToken)) {
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
      if (err) {
        return res.status(403).send('refresh token exist');
      }
      const accessToken = generateAccessToken({ userName: user.userName });
      res.json({ accessToken: accessToken });
    })
  }
})

app.delete('/api/token', (req, res) => {
  refreshTokens = refreshTokens.filter(token => token !== req.body.token);
  res.status(204);
})


function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) {
    return res.status(401).send('Not Allowed');
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.status(403).send('Invalid Token');
    }
    req.user = user;
    next();
  })
}

function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15s' });
}


const port = 5000;

app.listen(port, () => `Server running on port ${port}`);