const { Router } = require("express");
const router = Router();
const driver  = require("./driversRouter");
const teams =require("./teamsRouter")

router.use("/",driver);
router.use("/",teams);
module.exports = router;
