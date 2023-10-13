const express = require("express")
const app = express()
const cors = require("cors")

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

// middleware
app.use(cors())
app.use(express.json())

// hrsafin2434
//RKOnubVHLt3GUYmw

const uri = "mongodb+srv://hrsafin2434:RKOnubVHLt3GUYmw@cluster0.4vuldzf.mongodb.net/?retryWrites=true&w=majority";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
    try {
      // Connect the client to the server	(optional starting in v4.7)
      await client.connect();

      const dataBase = client.db("usersDB")
      const userCollection = dataBase.collection("users")
     
      // read user from database
      app.get("/users", async(req,res) => {
        const cursor = userCollection.find()
        const result = await cursor.toArray()
        res.send(result)
      })

      // create user or insert user
      app.post("/users", async(req,res) => {
        const user = req.body
        console.log("new user", user)
        const result = await userCollection.insertOne(user)
        res.send(result)
      })

      // update

      app.get("/users/:id", async(req,res) => {
        const id = req.params.id
        const  query = { _id: new ObjectId(id) };
        const result = await userCollection.findOne(query)
        res.send(result)
      })

      app.put("/users/:id", async(req,res) => {
        const id = req.params.id
         const user = req.body
         const filter = { _id: new ObjectId(id) };
         const options = { upsert: true };
         const updatedUser = {
          $set: {
            name : user.name,
            photo : user.photo,
            email : user.email
          },
         }

         console.log(user)

         const result = await userCollection.updateOne(filter, updatedUser, options)
         res.send(result)
      })

      // delete user
      app.delete("/users/:id", async(req, res) => {
         const id = req.params.id
         const query = { _id: new ObjectId(id) };
         const result = await userCollection.deleteOne(query)
         res.send(result)
      })

      
      // Send a ping to confirm a successful connection
      await client.db("admin").command({ ping: 1 });
      console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
      // Ensures that the client will close when you finish/error
    //   await client.close();
    }
  }
  run().catch(console.log);



  app.get("/", (req, res) => {
    res.send("Server is running")
  })











module.exports = app