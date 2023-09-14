import {
  GET_DRIVERS,
  GET_DRIVER_SEARCH,
  GET_DRIVER_DETAILS,
  GET_DRIVER_TEAMS,
  PAGINATE,
  RESET,
  FILTER_API,
  FILTER_TEAMS,ORDER_NAME,ORDER_DATE
} from "./actions_type";
import axios from "axios";

//* ----------------------------------------------------------------------------------------- Driver Actions
export function getDrivers() {
  return async function (dispatch) {
    try {
      const response = await axios.get("http://localhost:3001/drivers");
      dispatch({
        type: GET_DRIVERS,
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function searchDrivers(name) {
  return async function (dispatch) {
    try {
      const response = await axios.get(
        `http://localhost:3001/drivers/?name=${name}`
      );
      dispatch({
        type: GET_DRIVER_SEARCH,
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getDriver(id) {
  return async function (dispatch) {
    try {
      const response = await axios.get(`http://localhost:3001/drivers/${id}`);

      if (Array.isArray(response.data.teams)) {
        response.data.teams = response.data.teams.join(' - ');
      }
      dispatch({
        type: GET_DRIVER_DETAILS,
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function postDriver(state) {
  return async function () {
    try {
      await axios.post("http://localhost:3001/drivers", state);
      alert("Driver creado exitosamente");
    } catch (error) {
      alert(error.response.data.error);
    }
  };
}

//* -------------------------------------------------------------------------------------- Teams Actions
export function getTeams() {
  return async function (dispatch) {
    try {
      const response = await axios.get(`http://localhost:3001/teams`);
      dispatch({
        type: GET_DRIVER_TEAMS,
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export const teamsFilter = (team) => {
  return {
    type: FILTER_TEAMS,
    payload: team,
  }
};



//*  ---------------------------------------------------------------------------------- Extra Actions

export const page = (order) => {
  return {
    type: PAGINATE,
    payload: order,
  }
};



export const apiFilter = (payload) => {
  return {
    type: FILTER_API,
    payload: payload,
  }
};

export const orderByDate = (order) => {
	return {
		type: ORDER_DATE,
		payload: order,
	};
};


export const orderByName = (order) => {
	return {
		type: ORDER_NAME,
		payload: order,
	};
};


export const resetDrivers = () => {
  return {
    type: RESET,
  };
};
