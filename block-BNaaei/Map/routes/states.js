var express = require("express")

var router = express.Router();

var Country = require("../models/Country")

var State = require("../models/States")

router.get("/",(req,res,next)=>{
    State.find({}, (err, country)=>{
    res.json(country)
})
})


// create

router.post("/:id", (req,res,next)=>{
    let id = req.params.id;
    req.body.countryId = id
    State.create(req.body, (err, state)=>{
    if(err) return next(err)
    Country.findByIdAndUpdate(id, req.body, {$push:{state:state.id}}, (err, country)=>{
        if(err) return next(err)
        res.json(state)
    })
    })
})

// edit

router.put("/:id/edit", (req,res, next)=>{
    let id = req.params.id;
    if (req.body.neighbouringStates) {
        var newState = {
          $push: { neighbouringStates: req.body.neighbouringStates },
        };
      }
      State.findByIdAndUpdate(id, {newState, ...req.body}, {new:true},(err,country)=>{
        if(err) return next(err)

        res.json(country)
    })
})

// delete

router.delete("/:id/delete",(req,res,next)=>{
    let id = req.params.id;
    State.findByIdAndDelete(id, (err, country)=>{
        if(err) return next(err)
        res.json(country)
    })
})

// sort

router.get("/sort/ascending", (req,res,next)=>{

    State.find({}).sort("name")
    .populate("neighbouringCountires")
    // .populate("states")
    .exec((err, country)=>{
     if(err) return next(err)
     console.log(country)
     res.json(country)
    })

})



module.exports= router