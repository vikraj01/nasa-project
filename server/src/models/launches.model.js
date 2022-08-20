const launchesDatabase = require('./launches.mongo')
const planets = require('./planets.mongo')

const DEFAULT_FLIGHT_NUMBER = 100;






async function getLatestFlightNumber() {
    const latestLaunch = await launchesDatabase
    .findOne()
    .sort('-flightNumber')

    if (!latestLaunch) { 
        return DEFAULT_FLIGHT_NUMBER 
    };

    
    return latestLaunch.flightNumber
}






//launches.set(launch.flightNumber, launch)


async function existsLaunchWithId(launchId) {
    return await launchesDatabase.findOne({
        flightNumber:launchId,
    })
}


async function scheduleNewLaunch(launch) {

    const newFlightNumber = await getLatestFlightNumber() + 1;
    const newLaunch = Object.assign(launch, {
        success: true,
        upcoming: true,
        customers: ['Zero to Mastery', 'NASA'],
        flightNumber: +newFlightNumber,
    });
    await saveLaunch(newLaunch);
}

async function getAllLaunches() {
    return await launchesDatabase
        .find({}, { '_id': 0, '__v': 0 })
}

async function saveLaunch(launch) {
    const planet = await planets.findOne({
        keplerName: launch.target,
    });

    if (!planet) {
        throw new Error('No matching planet found')
    }
    await launchesDatabase.findOneAndUpdate({
        flightNumber: launch.flightNumber,
    },
        launch,
        {
            upsert: true,
        })
}




async function abortLaunchById(launchId) {

    const aborted = await launchesDatabase.updateOne({
        flightNumber: launchId
    },{
        upcoming: false,
        success: false,
    });
    console.log(aborted)

    return aborted.acknowledged === true && aborted.modifiedCount === 1;

    // const aborted = launches.get(launchId);
    // aborted.upcoming = false;
    // aborted.success = false;
    // return aborted;
}


module.exports = {
    getAllLaunches,
    scheduleNewLaunch,
    existsLaunchWithId,
    abortLaunchById
}