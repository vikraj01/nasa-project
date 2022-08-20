const {Schema, model} = require('mongoose')


const launchSchema = new Schema({
    fligtNumber:{
        type:Number,
        required:true,
    },
    launchDate: {
        type:Date,
        required:true
    },
    mission:{
        type:String,
        required:true
    },
    rocket:{
        type:String,
        required:true
    },
    target:{
        type:String,
        required:true
    },
    customers:[
        String
    ],
    upcoming:{
        type: Boolean,
        required: true,
    },
    success:{
        type:Boolean,
        required:true,
        default:true
    }
})


module.exports = model('Launch',launchSchema)