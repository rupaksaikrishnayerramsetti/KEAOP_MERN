const mongoose = require("mongoose")

async function mongoDBConnection(url){
    return await mongoose.connect(url)
}

module.exports = {
    mongoDBConnection
}