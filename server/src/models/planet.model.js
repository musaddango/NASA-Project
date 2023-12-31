const fs = require("node:fs");
const { parse } = require('csv-parse');

const planets = require('./planets.mongo.js');

function isHabitable(planet){
    return planet['koi_disposition'] === 'CONFIRMED'
           && planet['koi_insol']> 0.36 
           && planet['koi_insol']<1.11
           && planet['koi_prad'] < 1.6
} 
 
async function loadPlanetsData(){ 
    return await new Promise((resolve, reject)=>{
        fs.createReadStream('./data/keplar_data.csv')
        .pipe(parse({
            comment: '#',
            columns: true
        }))
        .on('data', async (data)=>{
            if(isHabitable(data)){ 
                savePlanet(data);
            }
        })
        .on('error',(err)=>{ 
            reject(err);
        })
        .on('end', async ()=>{
            const countFoundPlanets = (await getAllPlanets()).length
            console.log(`${countFoundPlanets} planets are similar to earth.`);
            resolve();
        })
    })
}

async function getAllPlanets(){
    return await planets.find({},{_id:0, __v: 0}); 
}

async function savePlanet(planet){
    try{
        await planets.updateOne({
            keplerName: planet.kepler_name,
        }, {
            keplerName: planet.kepler_name, 
        }, {upsert: true});
    } catch (err){
        console.error(`Could not save planet: ${err}`);
    }
}

module.exports = {
    getAllPlanets,
    loadPlanetsData
}
