const mongoose = require("mongoose");

const stateSchema = new mongoose.Schema({
    getState: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
})

const State = mongoose.model("State",stateSchema);

module.exports = State;