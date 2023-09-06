import {
  GET_DRIVERS,
  GET_DRIVER_SEARCH,
  GET_DRIVER_DETAILS,
  GET_DRIVER_TEAMS,
  PAGINATE,
  RESET,
  FILTER,
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

//*  ---------------------------------------------------------------------------------- Extra Actions

export function page(order) {
  return function (dispatch) {
    dispatch({
      type: PAGINATE,
      payload: order,
    });
  };
}
export function driversFilter(order) {
  return function (dispatch) {
    dispatch({
      type: FILTER,
      payload: order,
    });
  };
}

export function resetDrivers() {
  return function (dispatch) {
    dispatch({
      type: RESET,
    });
  };
}

