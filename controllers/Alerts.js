const { userAlertMsgTemplate, userEditedAlertMsgTemplate } = require("../helpers/EmailTemplates")
const { JWTTokenData, modifyDate, modifyTime, generateGoogleCalendarLink, sendEmail  } = require("../helpers/Utility")
const Alerts = require("../models/Alerts")

async function handleCreateAlert(req, res) {
    try{
        const body = req.body
        if(!body) return res.send(false)
        const data = JWTTokenData(body.token)
        const Title = body.title
        const result = await Alerts.create({
            user_id: data.user_id,
            title: Title.toUpperCase(),
            date: body.date,
            time: body.time
        })
        if(result){
            const modifiedDate = modifyDate(body.date)
            const modifiedTime = modifyTime(body.time)
            const googleCalendarLink = generateGoogleCalendarLink(Title.toUpperCase(), body.date, modifiedTime, `You had an important meeting of ${Title.toUpperCase()}`)
            const template = userAlertMsgTemplate(Title.toUpperCase(), modifiedDate, modifiedTime, googleCalendarLink)
            const sendAlert = sendEmail(data.email, "New Remainder Creation Alert", template)
            return res.send(true)
        }
        return res.send(false)
    } catch (err) {
        console.log("Error occured while creating Alert "+err)
        return res.send(false)
    }
}

async function handleFetchAllAlerts(req, res) {
    const token = req.headers.authorization
    const data = JWTTokenData(token)
    const alerts = await Alerts.find({user_id:data.user_id})
    return res.send(alerts)
}

async function handleEditAlert(req, res) {
    try {
        const body = req.body
        const token = JWTTokenData(body.token)
        const Title = body.title
        const alert = {
            title: Title.toUpperCase(),
            user_id: token.user_id,
            date: body.date,
            time: body.time
        }
        const result = await Alerts.findByIdAndUpdate(body.alert_id, alert)
        if(result){
            const modifiedDate = modifyDate(body.date)
            const modifiedTime = modifyTime(body.time)
            const googleCalendarLink = generateGoogleCalendarLink(Title.toUpperCase(), body.date, modifiedTime, `You had an important meeting of ${Title.toUpperCase()}`) 
            const template = userEditedAlertMsgTemplate(Title.toUpperCase(), modifiedDate, modifiedTime, googleCalendarLink)
            const sendAlert = sendEmail(token.email, "Remainder Update Alert", template)
            return res.send(true)
        }
        return res.send(false)
    } catch (err) {
        console.log("Error occured while Editing Alert "+err)
        return res.send(false)
    }
}

async function handleDeleteAlert(req, res) {
    const bodyToken = req.headers.authorization
    console.log(req.headers)
    const alert_id = req.headers.alertid
    const token = JWTTokenData(bodyToken)
    const result = await Alerts.findByIdAndDelete(alert_id)
    return res.send(result?true:false)
}

async function handleGetAlertCount(req, res) {
    const token = req.headers.authorization
    const data = JWTTokenData(token)
    try {
        const alerts = await Alerts.find({user_id: data.user_id})
        const AlertCount = alerts.length
        return res.send(AlertCount.toString())
    } catch (err) {
        return res.send("Error occured at handleGetAlertCount "+ err)
    }
}

async function handleFetchAlerts(req, res) {
    const token = req.headers.authorization
    const data = JWTTokenData(token)
    const alerts = await Alerts.find({user_id: data.user_id})
    return res.json({count: alerts.length, data: alerts})
}

module.exports = {
    handleCreateAlert,
    handleFetchAllAlerts,
    handleEditAlert,
    handleDeleteAlert,
    handleGetAlertCount,
    handleFetchAlerts
}