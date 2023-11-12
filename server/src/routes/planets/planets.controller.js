const { getAllPlanets } = require("../../models/planet.model.js");


function httpGetAllPlanets(req, res){
    res.status(200).json(getAllPlanets());
}

module.exports = {
    httpGetAllPlanets,
}