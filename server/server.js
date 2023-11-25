const http = require('node:http');
const { app } = require('./src/app.js');
const { loadPlanetsData } = require('./src/models/planet.model.js');
const { loadLaunchData } = require('./src/models/launches.model.js')
const { mongoseConnect } = require('./src/services/mongo.js');

const PORT = process.env.NASA_SERVER_PORT || 8000;
const server = http.createServer(app);

async function startServer(){
    await mongoseConnect();
    await loadPlanetsData();
    await loadLaunchData();
    server.listen(PORT, ()=>{
        console.log(`Server listening on port ${PORT}...`);
    });
}
 
startServer();