const express = require("express")
const router = express.Router()

const protect = require("../middleware/authMiddleware")

const {trackView,trackTime, trackReading} = require("../controllers/trackingController")

router.post("/view",protect,trackView)

router.post("/time",protect,trackTime)

router.post("/reading-time",protect,trackReading)


module.exports = router