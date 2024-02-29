const express = require("express")
const router = express.Router()
const {
    handleCreateUser,
    handleLoginCheck,
    handleFetchUserDetails,
    handleUpdateUserData,
    handleChangePassword,
    handleFetchTotalSalary
} = require("../controllers/Users")
const {
    handleCreateNote,
    handleFetchAllNotes,
    handleEditNote,
    handleDeleteNote,
    handleGetNoteCount,
    handleFetchNotes
} = require("../controllers/Notes")
const {
    handleCreateAlert,
    handleFetchAllAlerts,
    handleEditAlert,
    handleDeleteAlert,
    handleGetAlertCount,
    handleFetchAlerts
} = require("../controllers/Alerts")
const {
    handleUpdateSpentRecord, 
    handleFetchCurrentMonthRecord
} = require("../controllers/SpentAnalysis")

// Routes for Users
router.post("/createUser", handleCreateUser)
router.post("/loginCheck", handleLoginCheck)
router.get("/fetchUserDetails", handleFetchUserDetails)
router.post("/updateUserData", handleUpdateUserData)
router.post("/changePassword", handleChangePassword)
router.get("/fetchTotalSalary", handleFetchTotalSalary)

// Routes for Notes
router.post("/createNote", handleCreateNote)
router.get("/fetchAllNotes", handleFetchAllNotes)
router.post("/editNote", handleEditNote)
router.delete("/deleteNote", handleDeleteNote)
router.get("/getNoteCount", handleGetNoteCount)
router.get("/fetchNotes", handleFetchNotes)

// Routes for Alerts
router.post("/createAlert", handleCreateAlert)
router.get("/fetchAllAlerts", handleFetchAllAlerts)
router.post("/editAlert", handleEditAlert)
router.delete("/deleteAlert", handleDeleteAlert)
router.get("/getAlertCount", handleGetAlertCount)
router.get("/fetchAlerts", handleFetchAlerts)

// Routes for Spent Analysis
router.post("/updateSpentRecord", handleUpdateSpentRecord)
router.get("/fetchCurrentMonthRecord", handleFetchCurrentMonthRecord)

module.exports = router