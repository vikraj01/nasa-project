const mongoose = require('mongoose')

const MONGO_URL = 'mongodb+srv://Vik_ash_raj:root@cluster0.mfral.mongodb.net/nasa'


mongoose.connection.once('open', () => {
    console.log('MongoDB connection ready!')
})

mongoose.connection.on('error', (err) => {
    console.error(err)
})

async function mongoConnect() {
    await mongoose.connect(MONGO_URL)
}

async function mongoDisconnect() {
    await mongoose.disconnect()
}

module.exports = {
    mongoConnect,
    mongoDisconnect
}
