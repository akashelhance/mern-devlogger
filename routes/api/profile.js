const express= require('express')
const router= express.Router();


// @desc      Get all profile
// @route     GET /api/users
// @access    Public


router.get("/", (req,res,next)=>{
    res.status(200).json({message: "Getting all the profile"})
})


// @desc      create new users
// @route     GET /api/users
// @access    Public


router.post("/", (req,res,next)=>{
    res.status(200).json({message: "New USer Created"})
})


module.exports =router;