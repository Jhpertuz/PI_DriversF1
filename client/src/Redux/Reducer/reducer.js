import {
  GET_DRIVERS,
  GET_DRIVER_SEARCH,
  GET_DRIVER_DETAILS,
  GET_DRIVER_TEAMS,
  PAGINATE,
  RESET,
  FILTER,
} from "../Actions/actions_type";

let initialState = {
  allDrivers: [],
  allDriversBackup: [],
  driverDetails: {},
  driversTeams: [],
  driversSearch: [],
  driversFiltered: [],
  filters: false,
  currentPage: 0,
};

function rootReducer(state = initialState, action) {
  const ITEMS_PER_PAGE = 9;

  switch (action.type) {
    case GET_DRIVERS:
      return {
        ...state,
        allDrivers: [...action.payload].splice(0, ITEMS_PER_PAGE),
        allDriversBackup: action.payload,
      };

    case GET_DRIVER_SEARCH:
      driversSearch=[];
      return {
        ...state,
        driversSearch: action.payload,
      };

    case GET_DRIVER_DETAILS:
      return {
        ...state,
        driverDetails: action.payload,
      };

    case GET_DRIVER_TEAMS:
      return {
        ...state,
        driversTeams: action.payload,
      };
    case PAGINATE:
        const next_page = state.currentPage + 1;
        const prev_page = state.currentPage - 1;
        const firstIndex = action.payload === "next" ? next_page * ITEMS_PER_PAGE : prev_page * ITEMS_PER_PAGE
        if(action.payload === "next" && firstIndex >= state.allDriversBackup.length) return state
            else if (action.payload === "prev" && prev_page < 0) return state

        return{
            ...state,
            allHeroes: [...state.allDriversBackup].splice(firstIndex, ITEMS_PER_PAGE),
            currentPage: action.payload === "next" ? next_page : prev_page
        }


        case RESET:
            return{
                ...state,
                allDrivers:[...state.allDriversBackup].splice(0,ITEMS_PER_PAGE),
                currentPage: 0,
                filters:false,
                driversFiltered: []
            }
    default:
        return state;
  }
}
export default rootReducer;