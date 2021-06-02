var mongoose = require("mongoose")

var Schema = mongoose.Schema

var CountrySchema = new Schema({

name: String,
states :[{ type: Schema.Types.ObjectId, ref: 'State' }],
continent:String,
population:Number,
ethnicity : String,
neighbouringCountires :[{ type: Schema.Types.ObjectId, ref: 'Country' }],
area:String,
})

var Country =mongoose.model("Country", CountrySchema)

module.exports = Country