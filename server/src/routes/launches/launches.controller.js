const { getAllLaunches, addNewLaunch, abortLaunch, existsLaunchWithId } = require('../../models/launches.model');

function httpGetAllLaunches(req, res){
    return res.status(200).json(getAllLaunches());
}

function httpAddNewLaunch (req, res){
    const launch = req.body; 
    const { mission, launchDate, target, rocket } = req.body;
    if(!mission || !launchDate || !target || !rocket){
        return res.status(400).json({
            error: "Missing required launch property."
        })
    }
    launch.launchDate = new Date(launch.launchDate);
    if(isNaN(launch.launchDate)){
        return res.status(400).json({
            error:"Invalid launch date input",
        });
    } 
    addNewLaunch(launch);
    return res.status(201).json(launch);
}

function httpAbortLaunch(req, res){
    const launchId = req.params.id;
    if(existsLaunchWithId(launchId)){
        return res.status(404).json({
            error: "launch not found",
        })
    }
    if (!id || isNaN(Number(launchId))){
        return res.status(400).json({
            error: "Launch id"
        });
    }
    abortLaunch(id);
    return res.status(200).json();
}

module.exports = {
    httpGetAllLaunches,
    httpAddNewLaunch,
    httpAbortLaunch,
}