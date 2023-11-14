const { getAllLaunches, addNewLaunch, abortLaunch } = require('../../models/launches.model');

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
    const { id } = req.params;
    if (!id || isNaN(Number(id))){
        return res.status(400).json(err.message);
    }
    abortLaunch(id);
    return res.status(200).json("Mission aborted");
}

module.exports = {
    httpGetAllLaunches,
    httpAddNewLaunch,
    httpAbortLaunch,
}