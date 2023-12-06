const http = require('node:http');
require('dotenv').config()
const { app } = require('./src/app.js');
const { loadPlanetsData } = require('./src/models/planet.model.js');
const { loadLaunchData } = require('./src/models/launches.model.js');
const { mongoseConnect } = require('./src/services/mongo.js');

const server = http.createServer(app);

async function startServer(){
    await mongoseConnect();
    await loadPlanetsData();
    await loadLaunchData();
    server.listen(process.env.PORT, ()=>{
        console.log(`Server listening on port ${process.env.PORT}...`);
    });
}
 
startServer();