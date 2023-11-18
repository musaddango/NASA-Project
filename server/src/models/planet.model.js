const fs = require("node:fs");
const { parse } = require('csv-parse');


const habitablePlanets = [];

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
        .on('data', (data)=>{
            if(isHabitable(data)){
                // const strData = JSON.stringify(data);
                habitablePlanets.push(data);
            }
        })
        .on('error',(err)=>{
            reject(err);
        })
        .on('end', ()=>{
            console.log(`${habitablePlanets.length} planets are similar to earth.`);
            resolve();
        })
        
    })
}

function getAllPlanets(){
    return habitablePlanets; 
}
console.log("From planets model: ",getAllPlanets());

module.exports = {
    getAllPlanets,
    loadPlanetsData
}
