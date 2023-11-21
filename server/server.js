const http = require('node:http');
const mongoose = require('mongoose');
const { app } = require('./src/app.js');
const { loadPlanetsData } = require('./src/models/planet.model.js');

const PORT = process.env.NASA_SERVER_PORT || 8000;
const server = http.createServer(app);

// With commonJS where top level await doesn't work, the following logic will surfice;
const MONGO_URL = "mongodb+srv://nasa-api:R4Od323wteqrqQE0@nasacluster.qzjge7j.mongodb.net/nasa?retryWrites=true&w=majority"

mongoose.connection.once('open',()=>{
    console.log(`MongoDB connection opened.`);
})

mongoose.connection.on('error', (err)=>{
    console.error(`Error opening connection: ${err}`);
})

async function startServer(){
    await mongoose.connect(MONGO_URL);
    await loadPlanetsData();
    server.listen(PORT, ()=>{
        console.log(`Server listening on port ${PORT}...`);
    });
}
 
startServer();