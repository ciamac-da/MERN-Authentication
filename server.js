require('dotenv').config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const mongoose = require("mongoose");
const port = process.env.PORT || 5000

app.use(bodyParser.json())
app.use(cors())
app.use(
      bodyParser.urlencoded({
            extended: false
      })
)

mongoose
.connect(
      process.env.MongoURL, { 
            useNewUrlParser:    true,
            useCreateIndex:     true,
            useUnifiedTopology: true
          })
.then(() => console.log("MongoDB connected!"))
.catch(err => console.log(err))

const Users = require("./routes/Users")

app.use("/users", Users)

app.listen(port, () =>{
      console.log("Server is running on port:" + port )
})