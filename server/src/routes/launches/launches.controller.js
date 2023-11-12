const { getAllLaunches, addNewLaunch } = require('../../models/launches.model');

function httpGetAllLaunches(req, res){
    return res.status(200).json(getAllLaunches());
}

function httpAddNewLaunch (req, res){
    const launch = req.body;
    launch.launchDate = new Date(launch.launchDate);
    addNewLaunch(launch);
    res.status(200).end("launch post success")
}

module.exports = {
    httpGetAllLaunches,
    httpAddNewLaunch,
}