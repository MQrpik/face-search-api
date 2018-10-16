 const express = require('express');
 const bodyParser = require('body-parser');
 const bcrypt = require('bcrypt-nodejs');
 const cors = require('cors');
 const knex = require('knex');
 const register = require('./controlers/register');
 const signin = require('./controlers/signin');
 const profile = require('./controlers/profile');
 const image = require('./controlers/image');
 
 const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : 'kosowik1',
      database : 'face_search'
    }
  });
 
 const app = express();
 app.use(bodyParser.json());
 app.use(cors());
 
app.post('/signin', (req, res) => {signin.handleSignin(req, res, bcrypt, db)})

app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt)})

app.get('/profile/:id', (res, req) => {profile.handleProfile(req, res, db)})

app.put('/image', (res, req) => {image.handleImage(res, req, db)} )
app.post('/imageurl', (res, req) => {image.handleApiCall(res, req)} )

 app.listen(process.env.PORT || 3000, ()=> {
     console.log('app is running on port ${process.env.POST}');
 })
