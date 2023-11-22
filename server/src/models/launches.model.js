const launchesData = require('./launches.mongo.js')

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

let latestFlightNumber = launch.flightNumber;

launches.set(launch.flightNumber, launch);
saveLaunch(launch);

function existsLaunchWithId(launchId){
    return launches.has(launchId);
}

function getAllLaunches(){
    return Array.from(launches.values());
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
    await launchesData.updateOne({
        flightNumber: latestFlightNumber,
    }, {
        ...launch,
    }, {
        upsert: true
    })
    latestFlightNumber += 1;
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