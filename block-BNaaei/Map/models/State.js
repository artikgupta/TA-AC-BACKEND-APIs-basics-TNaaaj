var mongoose = require("mongoose")

var Schema = mongoose.Schema

var StateSchema = new Schema({

name: String,
continent:String,
neighbouringStates:[{ type: Schema.Types.ObjectId, ref: 'State' }],
population:Number,
countryId :[{ type: Schema.Types.ObjectId, ref: 'Country' }],
area:String,


})

var State = mongoose.model("State", StateSchema)

module.exports = State