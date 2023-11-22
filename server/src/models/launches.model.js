const launchesDatabase = require('./launches.mongo.js')

const launches = new Map();

const launch = {
    flightNumber: 100,
    mission: 'Kepler Exploration X',
    rocket: 'Explorer IS1',
    launchDate: new Date('December 27, 2030'),
    target: 'Kepler-442 b',
    customer: ['ZTM', 'NASA'],
    upcoming: true,
    success: true,
}

let latestFlightNumber = 100;

saveLaunch(launch);
saveLaunch(launch);

function existsLaunchWithId(launchId){
    return launches.has(launchId);
}

function getAllLaunches(){
    return launchesDatabase
            .find({},{_id:0, __v:0});
}

function addNewLaunch(launch){
    latestFlightNumber += 1;
    launches.set(latestFlightNumber, {
        ...launch,
        flightNumber: latestFlightNumber,
        customer: ['ZTM', 'NASA'], 
        upcoming: true,
        success: true,
        })
}

async function saveLaunch(launch){
    try{
        latestFlightNumber += 1;
        await launchesDatabase.updateOne({
            flightNumber: latestFlightNumber,
        }, { 
            ...launch,
            flightNumber: latestFlightNumber,
        }, {
            upsert: true
        })
    } catch(err){
        console.error(`Couldn't save launches: ${err}`)
    }
    
}

function abortLaunch(flightNumber){
    const aborted = launches.get(flightNumber);
    aborted.upcoming = false;
    aborted.success = false;
    return aborted;
}

module.exports = {
    existsLaunchWithId,
    getAllLaunches,
    addNewLaunch,
    abortLaunch,
}