const mongoose = require("mongoose")

const NotesSchema = new mongoose.Schema({
    user_id: {
        type: String,
        require: true
    },
    title: {
        type: String,
        require: true
    },
    value: {
        type: String,
        require: true
    }
}, {timestamps: true})

const Notes = mongoose.model("notes", NotesSchema)

module.exports = Notes