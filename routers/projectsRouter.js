const express = require("express")
const projectsDb = require("../data/helpers/projectModel") 
const router = express.Router()


router.get("/" , (req,res) => {
    res.json("this is the project router")
})

module.exports = router
