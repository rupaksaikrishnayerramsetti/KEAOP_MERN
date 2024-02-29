const { JWTTokenData, createJson, jsonForCurrentMonth } = require("../helpers/Utility");
const SpentAnalysis = require("../models/SpentAnalysis")

async function handleUpdateSpentRecord(req, res) {
    const body = req.body
    const data = JWTTokenData(body.token)
    const spent_type = body.spenttype
    const amount = body.amount
    const currentMonthYear = new Date().toLocaleString('en-US', { month: 'long', year: 'numeric' });
    let completeRecord = await SpentAnalysis.find({user_id: data.user_id})
    completeRecord = completeRecord[0].spent_data
    completeRecord[currentMonthYear][spent_type] += parseInt(amount, 10)
    completeRecord[currentMonthYear]['Savings'] -= parseInt(amount)
    const result = await SpentAnalysis.findOneAndUpdate(
        { user_id: data.user_id }, 
        { spent_data: completeRecord },   
        { new: true }              
      );
    return res.send(result? true : false)
}

async function handleFetchCurrentMonthRecord(req, res) {
    try {
        const currentMonthYear = new Date().toLocaleString('en-US', { month: 'long', year: 'numeric' });
        const token = req.headers.authorization
        const data = JWTTokenData(token)
        const result = await SpentAnalysis.find({user_id: data.user_id})
        if(result.length == 0){
            let spentData = await createJson(data.user_id)
            const result1 = await SpentAnalysis.create({
                user_id: data.user_id,
                spent_data: spentData
            })
            return res.send(spentData)
        } else {
            if(currentMonthYear in result[0].spent_data){
                return res.send({[currentMonthYear]: result[0].spent_data[currentMonthYear]})
            } else {
                const result2 = await jsonForCurrentMonth(data.user_id, result[0].spent_data)
                const result3 = await SpentAnalysis.findOneAndUpdate(
                    { user_id: data.user_id }, 
                    { spent_data: result2 },   
                    { new: true }              
                  );
                return res.send(result2)
            }
        }
    } catch (err) {
        console.log("Error occured at Spent Analysis handleFetchCurrentMonthRecord method "+err)
        return res.send(err)
    }
}

module.exports = {
    handleUpdateSpentRecord,
    handleFetchCurrentMonthRecord,
}
