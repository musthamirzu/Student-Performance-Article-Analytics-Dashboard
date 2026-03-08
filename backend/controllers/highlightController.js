const Highlight = require("../models/Highlight")

// SAVE HIGHLIGHT
exports.saveHighlight = async(req,res)=>{

try{

const highlight = await Highlight.create({
studentId:req.user._id,
articleId:req.body.articleId,
text:req.body.text,
timestamp:Date.now()
})

res.json(highlight)

}catch(err){
res.status(500).json(err.message)
}

}


// GET STUDENT HIGHLIGHTS
exports.getStudentHighlights = async(req,res)=>{

try{

const highlights = await Highlight.find({
studentId: req.user._id
}).populate("articleId","title")

res.json(highlights)

}catch(err){
res.status(500).json(err.message)
}

}