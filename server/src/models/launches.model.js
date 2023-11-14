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

function abortLaunch(flightNumber){
    const array = Array.from(launches.keys());
    console.log(`Array keys: ${array}`)
    if (!(flightNumber in array)){
    }
    launches.delete(flightNumber);
}

module.exports = {
    getAllLaunches,
    addNewLaunch,
    abortLaunch,
}