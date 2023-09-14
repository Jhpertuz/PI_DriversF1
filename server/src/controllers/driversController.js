const axios = require("axios");
const { Drivers, Teams } = require("../db");
const backup= "https://lh3.googleusercontent.com/pw/AIL4fc_irPj-zC5X-8l5pyb_Nbp77KZEb6iHx9kFHAKi0HSkYXIMOfO-rV2DCgbCNBxWDkmvaidBg7xyYSNKTH0TjPcxZvt5Hy-egA8a71VLflpGXimStn100xDtD0seXi5-ysPGJZVw0YH8u5kHVtQ2B2ZLzg=w785-h651-s-no?authuser=0"


const createDriver = async (
  forename,
  lastname,
  description,
  image_url,
  nationality,
  dob,
  teams
) => {
  if(!image_url) image_url= backup
  else if(image_url.length<4) image_url= backup

  
  const newDriver = await Drivers.create({
    forename,
    lastname,
    description,
    image_url,
    nationality,
    dob,
  });

  const foundTeams = await Promise.all(
    teams.map(async (t) => {
      const [createdTeam] = await Teams.findOrCreate({
        where: { teams: t },
      });
      return createdTeam;
    })
  );

  await newDriver.addTeams(foundTeams);
  const teamsArray = foundTeams.map((t) => t.teams);
 

  return {
    id: newDriver.id,
    forename: newDriver.forename,
    lastname: newDriver.lastname,
    description: newDriver.description,
    image_url: newDriver.image_url,
    nationality: newDriver.nationality,
    dob: newDriver.dob,
    teams: teamsArray,
    api:false
    
  };
};

const getDriversapi = async () => {
  const peticion = (await axios.get("http://localhost:5000/drivers")).data;
  let teamsArray = [];
  const allDrivers = peticion.map((a) => {
    const { id, name, description, image, nationality, dob } = a;
    if (a.teams) {
      teamsArray = a.teams.split(",").map((team) => team.trim());
    }
    

    if(a.image.url.length<4){

     
      return {
        id,
        forename: name.forename,
        lastname: name.surname,
        nationality,
        dob,
        teams: teamsArray,
        image_url: backup,
        description,
        api:true
      }
    }

    return {
      id,
      forename: name.forename,
      lastname: name.surname,
      nationality,
      dob,
      teams: teamsArray,
      image_url: image.url,
      description,
      api:true
    };
  });
  
  return allDrivers;
};

const getDriversDB = async () => {
  const allDrivers = await Drivers.findAll({
    include: [
      {
        model: Teams,
        attributes: ["teams"],
        through: {
          attributes: [],
        },
      },
    ],
  });


  const cleanDrivers = await Promise.all(
    allDrivers.map(async (d) => {
      const teamsArray = d.Teams.map((team) => team.teams);
      return {
        id: d.id,
        forename: d.forename,
        lastname: d.lastname,
        description: d.description,
        image_url: d.image_url,
        nationality: d.nationality,
        dob: d.dob,
        teams: teamsArray,
        api:false
      };
    })
  );

  return cleanDrivers;
};


const getAllDrivers = async (name) => {
  const driversApi = await getDriversapi();
  const driversDB = await getDriversDB();
  const allDrivers = [...driversApi, ...driversDB];
  if (!allDrivers.length) throw new Error("No se encontraron Conductores");
  if (name) {
    const filterDrivers = allDrivers.filter(
      (d) =>
        d.forename.toLowerCase().includes(name.toLowerCase()) ||
        d.lastname.toLowerCase().includes(name.toLowerCase())
    );
    return filterDrivers;
  }

  return allDrivers;
};

module.exports = {
  getDriversapi,
  getAllDrivers,
  getDriversDB,
  createDriver,
};
