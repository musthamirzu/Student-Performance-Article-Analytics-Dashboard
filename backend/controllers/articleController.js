const Article = require("../models/Article")

// CREATE ARTICLE (Teacher)
exports.createArticle = async (req,res)=>{
try{

const article = await Article.create({
title:req.body.title,
category:req.body.category,
contentBlocks:req.body.contentBlocks,
createdBy:req.user._id   // ✅ required field
})

res.status(201).json(article)

}catch(err){
console.log(err)
res.status(500).json({message:err.message})
}
}


// GET ALL ARTICLES
exports.getArticles = async(req,res)=>{
try{

const articles = await Article.find().populate("createdBy","name")

res.json(articles)

}catch(err){
res.status(500).json(err.message)
}
}


// GET SINGLE ARTICLE
exports.getArticleById = async(req,res)=>{
try{

const article = await Article.findById(req.params.id)

res.json(article)

}catch(err){
res.status(500).json(err.message)
}
}


// UPDATE ARTICLE
exports.updateArticle = async(req,res)=>{
try{

const article = await Article.findByIdAndUpdate(
req.params.id,
req.body,
{new:true}
)

res.json(article)

}catch(err){
res.status(500).json(err.message)
}
}


// DELETE ARTICLE
exports.deleteArticle = async(req,res)=>{
try{

await Article.findByIdAndDelete(req.params.id)

res.json({message:"Article deleted"})

}catch(err){
res.status(500).json(err.message)
}
}