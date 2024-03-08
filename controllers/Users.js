const { userCredentialsTemplate, userCredentialsChangedTemplate } = require("../helpers/EmailTemplates")
const { generatePassword, hashPassword, sendEmail, JWTTokenData } = require("../helpers/Utility")
const Users = require("../models/Users")
const jwt = require("jsonwebtoken")

async function handleCreateUser(req, res) {
    const body = req.body
    try{
        if(!body){
            return res.send(false)
        }
        const password = generatePassword()
        const result = await Users.create({
            user_name: body.user_name,
            email: body.email,
            gender: body.gender,
            occupation: body.occupation,
            phone_number: body.phone_number,
            salary: body.salary,
            password_digest: hashPassword(password)
        })
        if(result){
            const template = userCredentialsTemplate(body.email, password)
            const sendmail = sendEmail(body.email, "These are the credentials for Keep Everything at One Place", template)
            return res.send(true)
        }
    }
    catch(err) {
        console.log(err)
        return res.send(false)
    }
}

async function handleLoginCheck(req, res) {
    const body = req.body
    if(!body) return res.send("invalid")
    try{
    const passswordDigest = hashPassword(body.password)
        const user = await Users.find({email: body.email, password_digest: passswordDigest})
        if(user){
            const result = {
                user_id: user[0]._id,
                email: user[0].email
            }
            const token = jwt.sign(result, process.env.JWT_SECRET_KEY);
            return res.send(token)
        } else {
        return res.send("invalid")
        }
    }
    catch (err) {
        res.send("invalid")
    }
}

async function handleFetchUserDetails(req, res) {
    const token = req.headers.authorization
    const data = JWTTokenData(token)
    const user = await Users.find({email: data.email, _id: data.user_id})
    return res.send(user[0])
}

async function handleUpdateUserData(req, res) {
    const body = req.body
    const token = JWTTokenData(body.token)
    const user = {
        user_name: body.user_name,
        gender: body.gender,
        occupation: body.occupation,
        phone_number: body.phone_number
    }
    const result = await Users.findByIdAndUpdate(token.user_id, user)
    return res.send(result?true:false)
}

async function handleChangePassword(req, res) {
    const body = req.body
    const token = JWTTokenData(body.token)
    const oldpassswordDigest = hashPassword(body.password)
    const user = await Users.find({email: token.email, password_digest: oldpassswordDigest})
    const newPassword = body.newpassword
    if(user){
        const newpass = {
            password_digest: hashPassword(newPassword)
        }
        const result = await Users.findByIdAndUpdate(token.user_id, newpass)
        if(result){
            const template = userCredentialsChangedTemplate(token.email, newPassword)
            const sendmail = sendEmail(token.email, "These are the updated user credentials for Keep Everything at One Place", template)
            return res.send(true)
        }
    }
    return res.send(false)
}

async function handleForgotPassword(req, res) {
    const body = req.body
    const userEmail = body.email
    const user = await Users.find({email: userEmail})
    if(user.length!=0){
        const password = generatePassword()
        const newpass = {
            password_digest: hashPassword(password)
        }
        const result = await Users.findByIdAndUpdate(user[0]._id, newpass)
        if(result){
            const template = userCredentialsChangedTemplate(userEmail, password)
            const sendmail = sendEmail(userEmail, "These are the updated user credentials for Keep Everything at One Place", template)
            return res.send(true);
        }
    }
    return res.send(false);
}

async function handleFetchTotalSalary(req, res) {
    const token = req.headers.authorization
    const data = JWTTokenData(token)
    const user = await Users.find({email: data.email, _id: data.user_id})
    return res.json(user[0].salary)
}

module.exports = {
    handleCreateUser,
    handleLoginCheck,
    handleFetchUserDetails,
    handleUpdateUserData,
    handleChangePassword,
    handleFetchTotalSalary,
    handleForgotPassword
}