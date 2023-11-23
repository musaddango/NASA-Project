const mongoose = require('mongoose');

// With commonJS where top level await doesn't work, the following logic will surfice;
const MONGO_URL = "mongodb+srv://nasa-api:R4Od323wteqrqQE0@nasacluster.qzjge7j.mongodb.net/nasa?retryWrites=true&w=majority"

mongoose.connection.once('open',()=>{
    console.log(`MongoDB connection opened.`);
})

mongoose.connection.on('error', (err)=>{
    console.error(`Error opening connection: ${err}`);
})

async function mongoseConnect(){
    await mongoose.connect(MONGO_URL);
}

async function mongooseDisconnect(){
    await mongoose.disconnect();
}

module.exports = {
    mongoseConnect,
    mongooseDisconnect,
};