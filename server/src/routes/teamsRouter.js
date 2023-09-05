const {Router} = require("express");
const teams = Router();
const {teamsGetAndSave} =require("../handlers/teamsHandler")

teams.get("/teams/", teamsGetAndSave)

module.exports= teams;