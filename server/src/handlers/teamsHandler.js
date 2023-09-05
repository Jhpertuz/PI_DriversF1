const { getAllTeamsDB,cleanAllTeamsDB } = require("../controllers/teamsController");
const { Teams } = require("../db");

const teamsGetAndSave = async (req,res) => {
  try {
   const allTeams = await Teams.findAll();
    if (allTeams.length < 10) {
      await getAllTeamsDB();
      const response= await cleanAllTeamsDB()
      return res.status(200).json(response);
    }
    else{
        const response= await cleanAllTeamsDB()
        return res.status(200).json(response);
    }
  } catch (error) {
    res.status(404).json(error.message);
  }
};


module.exports = {
  teamsGetAndSave,
};
