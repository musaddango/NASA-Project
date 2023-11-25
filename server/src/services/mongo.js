require('dotenv').config()
const mongoose = require('mongoose');

// With commonJS where top level await doesn't work, the following logic will surfice;
const MONGO_URL = process.env.MONGO_URL;

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