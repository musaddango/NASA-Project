const http = require('node:http');
const { app } = require('./src/app.js');
const { loadPlanetsData } = require('./src/models/planet.model.js');

const PORT = 8000;
const server = http.createServer(app);

// With commonJS where top level await doesn't work, the following logic will surfice;
async function startServer(){
    await loadPlanetsData();
    server.listen(PORT, ()=>{
        console.log(`Server listening on port ${PORT}...`);
    });
}  
 
startServer();