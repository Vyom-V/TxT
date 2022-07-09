const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userTemplate =  new Schema({
    username:{
        type:String,
        required: true,
    },
    password:{
            type:String,
            required: true,
    },
    phone:{
        type:String,
        required: true,
    }
    
},{timestamps:true})

const messageTemplate =  new Schema({
    username:{
        type:String,
        required: true,
    },
    room:{
        type:String,
        required: true,
    },
    text:{
        type:String,
        required: true,
    },
},{timestamps:true})


const Users = mongoose.model('user',userTemplate)
const Text = mongoose.model('text',messageTemplate)

module.exports = { Users , Text }