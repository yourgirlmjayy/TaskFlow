require('dotenv').config();

const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = process.env.MONGO_URI;

const app = express();
const PORT = process.env.PORT

// middleware
app.use(express.json());  // lets server understand JSON
app.use(cors());  

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
        await client.connect();
        console.log('✅ MongoDB connected');
    
        const db = client.db(process.env.DB_NAME);
        console.log(db, "database")
        const tasks = db.collection('tasks');
    
        // test route
        app.get('/', async (req, res) => {
        const sampleTask = { name: "test task", createdAt: new Date() };
        await tasks.insertOne(sampleTask);
        res.send('TaskFlow backend with MongoDB is running 🚀');
        });
    
        app.listen(PORT, () => {
        console.log(`Server started on port ${PORT}`);
        });
    
    } catch (err) {
        console.error(err);
    }
    }
      
run().catch(console.dir);
