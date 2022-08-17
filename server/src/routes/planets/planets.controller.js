const {getAllPlanets} = require('../../models/planets.model')

const httpGetAllPlanets = (req,res,next) => {
    return res.status(200).json(getAllPlanets())
}



module.exports = {
    httpGetAllPlanets
}