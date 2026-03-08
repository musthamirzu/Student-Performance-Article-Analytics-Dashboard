const express = require("express")
const router = express.Router()

const protect = require("../middleware/authMiddleware")

const {saveHighlight,getStudentHighlights
} = require("../controllers/highlightController")

router.post("/",protect,saveHighlight)

router.get("/",protect,getStudentHighlights)

module.exports = router