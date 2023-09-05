const axios = require("axios");
const { Teams } = require("../db");

const getAllTeamsDB = async () => {
  const peticion = (await axios.get("http://localhost:5000/drivers")).data;
  let teamsApi = [];

  peticion.forEach((d) => {
    if (d.teams) {
      let teamsArray = d.teams.split(",").map((team) => team.trim());
      teamsApi.push(...teamsArray);
    }
  });
  let teamsUnicos = [...new Set(teamsApi)];
  teamsUnicos.forEach(async (t) => {
    await Teams.findOrCreate({
      where: {
        teams: t,
      },
    });
  });

  console.log("Equipos Creados Exitosamente");
};

const cleanAllTeamsDB = async () => {
  const cleanTeams = [];
  const allTeams = await Teams.findAll();
  allTeams.map(async (t) => {
    cleanTeams.push(t.teams);
  });

  return cleanTeams;
};

module.exports = {
  getAllTeamsDB,cleanAllTeamsDB
};
