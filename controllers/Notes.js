const { JWTTokenData } = require("../helpers/Utility")
const Notes = require("../models/Notes")

async function handleCreateNote(req, res) {
    try{
        const body = req.body
        if(!body){
            return res.send(false)
        }
        const data = JWTTokenData(body.token)
        const result = await Notes.create({
            user_id: data.user_id,
            title: body.title,
            value: body.value
        })
        return res.send(result? true: false)
    } catch (err) {
        return res.send(false)
    }
}

async function handleFetchAllNotes(req, res) {
    const token = req.headers.authorization
    const data = JWTTokenData(token)
    const notes = await Notes.find({user_id: data.user_id})
    return res.send(notes)
}

async function handleEditNote(req, res) {
    const body = req.body
    const token = JWTTokenData(body.token)
    const note = {
        title: body.title,
        user_id: token.user_id,
        value: body.value
    }
    const result = await Notes.findByIdAndUpdate(body.note_id, note)
    return res.send(result?true:false)
}

async function handleDeleteNote(req, res) {
    const bodyToken = req.headers.authorization
    console.log(req.headers)
    const note_id = req.headers.noteid
    const token = JWTTokenData(bodyToken)
    const result = await Notes.findByIdAndDelete(note_id)
    return res.send(result?true:false)
}

async function handleGetNoteCount(req, res) {
    const token = req.headers.authorization
    const data = JWTTokenData(token)
    const notes = await Notes.find({user_id: data.user_id})
    const NoteCount = notes.length
    return res.send(NoteCount.toString())
}

async function handleFetchNotes(req, res) {
    const token = req.headers.authorization
    const data = JWTTokenData(token)
    const notes = await Notes.find({user_id: data.user_id})
    return res.json({count: notes.length, data: notes})
}

module.exports = {
    handleCreateNote,
    handleFetchAllNotes,
    handleEditNote,
    handleDeleteNote,
    handleGetNoteCount,
    handleFetchNotes
}