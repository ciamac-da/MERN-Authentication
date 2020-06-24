const express = require("express");
const users = express.Router();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const User = require("../models/User")

users.use(cors())

process.env.SECRET_KEY="secret"

users.post("/register",(req,res) => {
      const today = new Date()
      const userData ={
            first_name : req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            password: req.body.password,
            created: today,
      }
User.findOne({
      email: req.body.email
})
.then(user =>{
      if(!user){
            bcrypt.hash(req.body.password ,10 , (err,hash)=>{
                  userData.password = hash  
                  User.create(userData)
                  .then(user=>{
                        res.json({status:user.email + "registered!"})
                  })
                  .catch(err=>{
                        res.send("error" + err)
                  })
            })
      }else {
            res.json({error:"User already exists!"})            
                  }
})
.catch(err=>{
      res.send("error:"+ err)
})
})

// Login route's logic!
// First of all we catch email using findOne() method!
// Then we've found the user we have to use becrypt and also comparing passwords
// Passwords means the password from DataBank and th epassword that we write and submit to logging in!
// Then if password was valid, we save it in payload and we catch important things of Schema in payload
// we save the user in token using jwt and sign() method!
// There should be also error function to get error if we had an error!
users.post("/login", (req,res) =>{
      User.findOne({
            email: req.body.email
      })
      .then(user =>{
            if(user){
                  const passwordValid = bcrypt.compareSync(req.body.password, user.password)
                  console.log("password valider", passwordValid, req.body.password, user.password)

                  if(passwordValid) {
                        const payload = {
                              _id: user._id,
                              first_name: user.first_name,
                              last_name: user.last_name,
                              email: user.email
                        }
                        let token = jwt.sign(payload, process.env.SECRET_KEY, {
                              expiresIn:1440
                        })
                        res.send(token)
                  }else {
                        res.json({error: "Wrong password!"})
                  }
            }else {
                  res.json({error: "User does not exists!"})
            }
      })
      .catch(err => {
            res.send("error:" + err)
      })
})
// Time to define our /profile strategy 
// We have to decode our user , whose Logged in successfuly!
// For that we use jwt and verify() method and we define headers usein authorization that comes from cors
users.get("/profile" , (req, res) => {
      var decoded = jwt.verify(req.headers["authorization"], process.env.SECRET_KEY)
      User.findOne({
            _id: decoded._id
      })
      .then(user => {
            if(user){
                  res.json(user)
            }else {
                  res.send("User does not exists!")
            }
      })
      .catch(err => {
            res.send("error" + err)
      })
})


module.exports = users