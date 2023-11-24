const launchesDatabase = require('./launches.mongo.js');
const planets = require('./planets.mongo.js');

const DEFAULT_FLIGHT_NUMBER = 100;

async function existsLaunchWithId(launchId){
    return await launchesDatabase.find({
        flightNumber: launchId,
    });
}

function getAllLaunches(){
    return launchesDatabase
            .find({},{_id:0, __v:0});
}

async function getLatestFlightNumber(){
    const latestFlight = await launchesDatabase
        .find()
        .sort({flightNumber: -1});
    if(latestFlight.length === 0){
        return DEFAULT_FLIGHT_NUMBER;
    }else{
        const latestFlightNumber = latestFlight[0].flightNumber;
        return latestFlightNumber;
    }
}

async function saveLaunch(launch){
    
    let latestFlightNumber = await getLatestFlightNumber();
    const planetAvailable = await planets.findOne({
        keplerName: launch.target,
    });
    
    if(!planetAvailable){
        throw new Error(`No planet found.`)
     }
    try{
        latestFlightNumber += 1;
        await launchesDatabase.updateOne({
            flightNumber: latestFlightNumber,
        }, launch, {
            upsert: true
        })
    } catch(err){
        throw new Error(`Couldn't save launches: ${err}`)
    }
}

async function scheduleNewLaunch(launch){
    const newFlightNumber = await getLatestFlightNumber() + 1;
    const newLaunch = {
        ...launch,
        flightNumber: newFlightNumber,
        customer: ['ZTM', 'NASA'], 
        upcoming: true,
        success: true,
    }
    await saveLaunch(newLaunch)
}

async function abortLaunch(launchId){
    const aborted = await launchesDatabase.updateOne({
        flightNumber: launchId,
    }, {
        upcoming: false,
        success: false,
    });

    return aborted.modifiedCount === 1 && aborted.matchedCount === 1 ? true: false;
}

module.exports = {
    existsLaunchWithId,
    getAllLaunches,
    scheduleNewLaunch,
    abortLaunch,
}