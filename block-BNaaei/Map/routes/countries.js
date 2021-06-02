var express = require("express")

var router = express.Router();

var Country = require("../models/Country")

router.get("/",(req,res,next)=>{
Country.find({}, (err, country)=>{
    res.json(country)
})
})


// create

router.post("/create", (req,res,next)=>{
    Country.create(req.body, (err, country)=>{
        res.json(country)
    })
})

// edit

router.put("/:id/edit", (req,res, next)=>{
    let id = req.params.id;
    if (req.body.neighbouringCountires) {
        var newCountry = {
          $push: { neighbouringCountires: req.body.neighbouringCountires },
        };
      }
    Country.findByIdAndUpdate(id, {newCountry, ...req.body}, {new:true},(err,country)=>{
        if(err) return next(err)

        res.json(country)
    })
})

// delete

router.delete("/:id/delete",(req,res,next)=>{
    let id = req.params.id;
    Country.findByIdAndDelete(id, (err, country)=>{
        if(err) return next(err)
        res.json(country)
    })
})

// sort

router.get("/sort/ascending", (req,res,next)=>{

    Country.find({}).sort("name")
    .populate("neighbouringCountires")
    // .populate("states")
    .exec((err, country)=>{
     if(err) return next(err)
     console.log(country)
     res.json(country)
    })

})



router.get("/sort/descending", (req,res,next)=>{

    Country.find({}).sort({name :-1})
    .populate("neighbouringCountires")
    // .populate("states")
    .exec((err, country)=>{
     if(err) return next(err)
     console.log(country)
     res.json(country)
    })

})



router.get("/ethnicity", (req,res,next)=>{
    Country.aggregate([{$group: {_id: "$ethnicity"}}],(err, ethnicity) => {
        console.log(ethnicity)
    });
})


router.get("/continent", (req,res,next)=>{
    Country.aggregate([{$group: {_id: "$continent"}}],(err, continent) => {
        console.log(continent)
    });
})



router.get("/population", (req,res,next)=>{
    Country.aggregate([{$group: {_id: "$population"}}],(err, population) => {
        console.log(population)
    });
})





module.exports= router