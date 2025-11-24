const express = require("express")
const router = express.Router()
const admincntrl = require("../controller/adminCntrl")
const middleware = require("../middleware/isLoggedIn")
const contrl = require("../controller/adminCntrl")


router.post("/registerAdmin", admincntrl.registerAdmin)
router.post("/loginAdmin", admincntrl.loginAdmin)
router.post("/registerUser", admincntrl.registerUser)
router.post("/loginUser", admincntrl.loginUser)
router.post("/createBooking", admincntrl.createBooking)

module.exports=router