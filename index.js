const express = require("express")
const { mongoDBConnection } = require("./Connection")
const router = require("./routes")
const app = express()
const {logReqRes} = require("./middleware")
const dotenv = require("dotenv")
dotenv.config()
const cors = require("cors")

mongoDBConnection(process.env.MONGO_DB_CONNECTION_URL).then(() => console.log("MongoDB connected.."))
.catch((err) => console.log("Mongodb connection error", err))

// Middlewares
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(cors())

//user-defined middleWare to create logs
app.use(logReqRes("log.txt"))

app.use("/", router)

const port = process.env.PORT
app.listen(port||8000, () => console.log(`Server Started at Port ${port}`))