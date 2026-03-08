const mongoose = require("mongoose");

const analyticsSchema = new mongoose.Schema({

    articleId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Article"
    },

    studentId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },

    views:{
        type:Number,
        default:1
    },

    duration:{
        type:Number,
        default:0
    },

    date:{
        type:Date,
        default:Date.now
    }

})

module.exports = mongoose.model("Analytics",analyticsSchema)