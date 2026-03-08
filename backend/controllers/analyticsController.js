const Analytics = require("../models/Analytics")
const Article = require("../models/Article")

exports.articleViews = async(req,res)=>{

try{

const data = await Analytics.aggregate([

{
$group:{
_id:"$articleId",
totalViews:{$sum:"$views"}
}
},

{
$lookup:{
from:"articles",
localField:"_id",
foreignField:"_id",
as:"article"
}
},

{
$unwind:"$article"
},

{
$project:{
title:"$article.title",
totalViews:1
}
}

])

res.json(data)

}catch(err){
res.status(500).json(err.message)
}

}

exports.categoryDistribution = async(req,res)=>{

try{

const data = await Analytics.aggregate([

{
$lookup:{
from:"articles",
localField:"articleId",
foreignField:"_id",
as:"article"
}
},

{$unwind:"$article"},

{
$group:{
_id:"$article.category",
views:{$sum:"$views"}
}
}

])

res.json(data)

}catch(err){
res.status(500).json(err.message)
}

}

exports.dailyEngagement = async(req,res)=>{

try{

const data = await Analytics.aggregate([

{
$group:{
_id:{
$dateToString:{
format:"%Y-%m-%d",
date:"$date"
}
},
reads:{$sum:1}
}
},

{$sort:{_id:1}}

])

res.json(data)

}catch(err){
res.status(500).json(err.message)
}

}

exports.studentProgress = async(req,res)=>{

try{

const data = await Analytics.aggregate([

{
$group:{
_id:"$studentId",
articlesRead:{$sum:1},
totalTime:{$sum:"$duration"}
}
}

])

res.json(data)

}catch(err){
res.status(500).json(err.message)
}

}

exports.getTopCategories = async(req,res)=>{

const categories = await Article.aggregate([

{
$group:{
_id:"$category",
count:{$sum:1}
}
},
{
$sort:{count:-1}
},
{
$limit:3
}

])

res.json(categories)

}

exports.getStudentProgress = async(req,res)=>{

const progress = await Analytics.find()
.populate("studentId","name")
.populate("articleId","title")

res.json(progress)

}

exports.getArticlesCount = async (req,res)=>{
    
const count = await Article.countDocuments({createdBy:req.user._id})

res.json({count})

}

exports.getTotalStudentsRead = async(req,res)=>{

const students = await Analytics.distinct("studentId")

res.json({total:students.length})

}

exports.getTotalReads = async (req,res)=>{

try {

const students = await Analytics.aggregate([
{
$group: {
_id: "$studentId"
}
},
{
$count: "totalStudents"
}
])

res.json({
total: students[0]?.totalStudents || 0
})

} catch (err) {
res.status(500).json(err.message)
}


}

exports.getTimeByCategory = async (req, res) => {

const studentId = req.user._id;

const result = await Analytics.aggregate([

{
$match: { studentId }
},

{
$lookup: {
from: "articles",
localField: "articleId",
foreignField: "_id",
as: "article"
}
},

{
$unwind: "$article"
},

{
$group: {
_id: "$article.category",
duration: { $sum: "$duration" }
}
}

]);

res.json(result);

};