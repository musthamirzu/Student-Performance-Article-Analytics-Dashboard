const express = require("express")
const router = express.Router()

const protect = require("../middleware/authMiddleware")
const teacherOnly = require("../middleware/roleMiddleware")

const {
createArticle,
getArticles,
getArticleById,
updateArticle,
deleteArticle
} = require("../controllers/articleController")


router.post("/",protect,teacherOnly,createArticle)

router.get("/",protect,getArticles)

router.get("/:id",protect,getArticleById)

router.put("/:id",protect,teacherOnly,updateArticle)

router.delete("/:id",protect,teacherOnly,deleteArticle)

module.exports = router