const mongoose = require("mongoose")

const AlertsSchema = new mongoose.Schema({
    user_id: {
        type: String,
        require: true
    },
    title: {
        type: String,
        require: true
    },
    date: {
        type: String,
        require: true
    },
    time: {
        type: String,
        require: true
    }
}, {timestamps: true})

const Alerts = mongoose.model("alerts", AlertsSchema)

module.exports = Alerts