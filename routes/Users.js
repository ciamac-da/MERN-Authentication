const express = require("express");
const users = express.Router();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const User = require("../models/User")

users.use(cors())

process.env.SECRET_KEY="secret"

users.post("/register",(req,res) => {
      const today = new Date(),
      const userData ={
            first_name : req.body.first_name,
            last_name: req.body.last_name
      }

})