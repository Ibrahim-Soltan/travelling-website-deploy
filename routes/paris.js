const { json } = require("body-parser");
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("paris");
});

router.post("/", (req, res) => {
  const username = req.body.username;
  // res.render("paris");
  console.log('here');
  const { MongoClient } = require("mongodb");
  // Connection URL
  const uri = "mongodb://0.0.0.0:27017";
  // Create a new MongoClient
  const client = new MongoClient(uri);
  async function run() {
    try {
      // Connect the client to the server (optional starting in v4.7)
      await client.connect();
      // Establish and verify connection
      await client.db("travellingDB").command({ ping: 1 });
      console.log("Connected successfully to server");
      var coll = await client.db('travellingDB').collection('users');
      await coll.updateOne({userName: username  },{ 
        $addToSet: { 
          wantToGoList: {
              $each: ["Paris"],    
           }
         } 
       });
  } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }
  run().catch(console.dir);
  res.render("paris");
});




module.exports = router;
