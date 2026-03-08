const express = require("express")
const router = express.Router()

const protect = require("../middleware/authMiddleware")

const {
articleViews,
categoryDistribution,
dailyEngagement,
studentProgress,
getArticlesCount,
getTopCategories,
getStudentProgress,
getTotalReads,
getTimeByCategory
} = require("../controllers/analyticsController")


router.get("/articles-views",protect,articleViews)

router.get("/articles-count",protect,getArticlesCount)

router.get("/students-read-count",protect,getTotalReads)

router.get("/top-categories",protect,getTopCategories)

router.get("/category-distribution",protect,categoryDistribution)

router.get("/daily-engagement",protect,dailyEngagement)

router.get("/student-progress",protect,studentProgress)

router.get("/student-Details",protect,getStudentProgress)

router.get("/time-by-category", protect, getTimeByCategory);
module.exports = router