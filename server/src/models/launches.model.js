const axios = require('axios');
const launchesDatabase = require('./launches.mongo.js');
const planets = require('./planets.mongo.js');

const SPACEX_API_URL = 'https://api.spacexdata.com/v4/launches/query';
const DEFAULT_FLIGHT_NUMBER = 100;

async function populateLaunch(){
    console.log('Downloading Launches...');
    try{
        const response = await axios.post(SPACEX_API_URL, {
            "pagination": false,
            "options":{
                "pagination": false,
                "populate":[
                    {
                        "path": "rocket",
                        "select":{
                            "name": 1
                        }
                    },
                    {
                        "path": "payloads",
                        "select":{
                            "customers": 1
                        }
                    }
                ]
            }
        });

        const loadDocs = response.data.docs;
        for (const loadDoc of loadDocs){
            const payloads = loadDoc['payloads'];
            const customers = payloads.flatMap(payload=>{ 
                return payload['customers'];
            });
            const launch = {
                flightNumber: loadDoc['flight_number'],
                mission: loadDoc['name'], 
                rocket: loadDoc['rocket']['name'],
                launchDate: new Date(loadDoc['date_local']),
                customers,
                upcoming: loadDoc['upcoming'], 
                success: loadDoc['success'],
            }
            console.log(`${launch.flightNumber} Launch Customers: ${launch.customers} ${launch.rocket}`)
            await saveLaunch(launch);
        }
    }catch(err){
        throw new Error(`Fail to fetch data from spaceX api`);
    }
}

async function loadLaunchData(){
    const firstLaunch = await findLaunch({
        flightNumber: 1,
        rocket: 'Falcon 1',
        mission: 'FalconSat',
    });
    if(firstLaunch){
        console.log('Data already loaded in database');
        return;
    }
    await populateLaunch();
}

async function findLaunch(filter){
    return await launchesDatabase.findOne(filter);
}

async function existsLaunchWithId(launchId){
    return await findLaunch({
        flightNumber: launchId,
    });
}

function getAllLaunches(skip, limit){
    return launchesDatabase
            .find({},{_id:0, __v:0})
            .sort({flightNumber: 1})
            .skip(skip)
            .limit(limit);
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
    const planetAvailable = await planets.findOne({
        keplerName: launch.target,
    });
    
    if(!planetAvailable){
        throw new Error(`No planet found.`)
     }
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
    loadLaunchData,
    existsLaunchWithId,
    getAllLaunches,
    scheduleNewLaunch,
    abortLaunch,
}