const Analytics = require("../models/Analytics")

exports.trackView = async(req,res)=>{

    const {articleId} = req.body

    const analytics = await Analytics.create({

        articleId,
        studentId:req.user._id,
        views:1

    })

    res.json(analytics)

}

exports.trackTime = async(req,res)=>{

    const {articleId,duration} = req.body

    const analytics = await Analytics.create({

        articleId,
        studentId:req.user._id,
        duration

    })

    res.json(analytics)

}



exports.trackReading = async (req, res) => {

try {

const { articleId, duration } = req.body
const studentId = req.user._id

if (!articleId) {
return res.status(400).json({ message: "Article ID is required" })
}

let record = await Analytics.findOne({
articleId,
studentId
})

if (record) {

record.views += 1
record.duration += Number(duration || 0)

await record.save()

} else {

record = await Analytics.create({
articleId,
studentId,
views: 1,
duration: Number(duration || 0)
})

}

res.status(200).json({
message: "Reading data recorded",
data: record
})

} catch (err) {

console.error(err)
res.status(500).json({ message: "Server Error" })

}

}