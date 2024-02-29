const mongoose = require("mongoose")

const SpentAnalysisSchema = new mongoose.Schema({
    user_id: {
        type: String,
        require: true
    },
    spent_data: {
        type: Object,
        require: true
    }
}, {timestamps: true})

const SpentAnalysis = mongoose.model("spentanalysis", SpentAnalysisSchema)

module.exports = SpentAnalysis