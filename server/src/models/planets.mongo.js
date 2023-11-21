const mongoose = require('mongoose');

const planetsSchema = new mongoose.Schema({
    keplarName: {
        type: String,
        required: true,
    }
});
