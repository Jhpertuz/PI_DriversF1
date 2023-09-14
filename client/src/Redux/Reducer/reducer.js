import {
  GET_DRIVERS,
  GET_DRIVER_SEARCH,
  GET_DRIVER_DETAILS,
  GET_DRIVER_TEAMS,
  PAGINATE,
  RESET,
  FILTER_API,
  FILTER_TEAMS,
  ORDER_NAME,
  ORDER_DATE,
} from "../Actions/actions_type";

let initialState = {
  allDrivers: [],
  allDriversBackup: [],
  driverDetails: {},
  driversTeams: [],
  teamsFiltered: [],
  apiOrDbFiltered: [],
  driversSearch: [],
  driversOrderbackup: [],
  filterApi: false,
  filterTeams: false,
  paginateSearch: false,
  paginateInit: false,
  orderValue: false,
  currentPage: 0,
  allPages: 0,
  newPostCounter: 0,
};

function rootReducer(state = initialState, action) {
  const ITEMS_PER_PAGE = 9;
  let auxiPages = 0;

  switch (action.type) {
    case GET_DRIVERS:
      return {
        ...state,
        allDrivers: [...action.payload].splice(0, ITEMS_PER_PAGE),
        allDriversBackup: action.payload,
      };

    case GET_DRIVER_SEARCH:
      return {
        ...state,
        paginateSearch: true,
        allDrivers: [...action.payload].splice(0, ITEMS_PER_PAGE),
        driversSearch: action.payload,
        currentPage: 0,
      };

    case GET_DRIVER_DETAILS:
      return {
        ...state,
        driverDetails: action.payload,
        currentPage: 0,
      };

    case GET_DRIVER_TEAMS:
      return {
        ...state,
        driversTeams: action.payload,
      };

    case PAGINATE:
      const next_page = state.currentPage + 1;
      const prev_page = state.currentPage - 1;
      const firstIndex =
        action.payload === "next"
          ? next_page * ITEMS_PER_PAGE
          : prev_page * ITEMS_PER_PAGE;

      auxiPages = Math.ceil(state.allDriversBackup.length / ITEMS_PER_PAGE);
      //MONTADO DEL PAGINADO

      if (action.payload === "init") {
    
        return {
          ...state,
          allPages: auxiPages,
          allDrivers: [...state.allDriversBackup].splice(0, ITEMS_PER_PAGE),
          currentPage: 0,
          paginateInit: true,
        };
      }
      //PAGINADO PARA EL FILTRADO DE EQUIPOS
      else if (state.filterTeams) {
        auxiPages = Math.ceil(state.teamsFiltered.length / ITEMS_PER_PAGE);

        if (
          action.payload === "next" &&
          firstIndex >= state.teamsFiltered.length
        )
          return state;
        else if (action.payload === "prev" && prev_page < 0) return state;

        return {
          ...state,
          allPages: auxiPages,
          allDrivers: [...state.teamsFiltered].splice(
            firstIndex,
            ITEMS_PER_PAGE
          ),
          paginateInit: true,
          currentPage: action.payload === "next" ? next_page : prev_page,
        };
      }
      //PAGINADO PARA EL FILTRADO DE API O DB
      else if (state.filterApi) {
        auxiPages = Math.ceil(state.apiOrDbFiltered.length / ITEMS_PER_PAGE);
        if (
          action.payload === "next" &&
          firstIndex >= state.apiOrDbFiltered.length
        )
          return state;
        else if (action.payload === "prev" && prev_page < 0) return state;

        return {
          ...state,
          allPages: auxiPages,
          allDrivers: [...state.apiOrDbFiltered].splice(
            firstIndex,
            ITEMS_PER_PAGE
          ),
          paginateInit: true,
          currentPage: action.payload === "next" ? next_page : prev_page,
        };
      }

      //PAGINADO PARA SEARCH
      else if (state.paginateSearch) {
        if (
          action.payload === "next" &&
          firstIndex >= state.driversSearch.length
        )
          return state;
        else if (action.payload === "prev" && prev_page < 0) return state;
        auxiPages = Math.ceil(state.driversSearch.length / ITEMS_PER_PAGE);

        return {
          ...state,
          allPages: auxiPages,
          allDrivers: [...state.driversSearch].splice(
            firstIndex,
            ITEMS_PER_PAGE
          ),
          paginateInit: true,
          currentPage: action.payload === "next" ? next_page : prev_page,
        };
      }

      //PAGINADO PARA ORDENAMIENTO
      else if (state.orderValue) {
        if (
          action.payload === "next" &&
          firstIndex >= state.driversOrderbackup.length
        )
          return state;
        else if (action.payload === "prev" && prev_page < 0) return state;
        auxiPages = Math.ceil(state.driversOrderbackup.length / ITEMS_PER_PAGE);

        return {
          ...state,
          allPages: auxiPages,
          allDrivers: [...state.driversOrderbackup].splice(
            firstIndex,
            ITEMS_PER_PAGE
          ),
          paginateInit: true,
          currentPage: action.payload === "next" ? next_page : prev_page,
        };
      }

      //PAGINADO NORMAL
      else if (
        action.payload === "next" &&
        firstIndex >= state.allDriversBackup.length
      )
        return state;
      else if (action.payload === "prev" && prev_page < 0) return state;

      return {
        ...state,
        allPages: auxiPages,
        allDrivers: [...state.allDriversBackup].splice(
          firstIndex,
          ITEMS_PER_PAGE
        ),
        paginateInit: true,
        currentPage: action.payload === "next" ? next_page : prev_page,
      };

    case FILTER_TEAMS:
      const teamsFiltered = state.allDriversBackup.filter((d) =>
        d.teams?.includes(action.payload)
      );

      const allDriversSlice = teamsFiltered.slice(0, ITEMS_PER_PAGE);

      return {
        ...state,
        allDrivers: allDriversSlice,
        teamsFiltered: teamsFiltered,
        filterTeams: true,
        currentPage: 0,
      };

    case FILTER_API:
      let apiFilter = [];

      switch (action.payload) {
        case "true":
          const trueSourceData = state.paginateSearch
            ? state.driversSearch
            : state.filterTeams
            ? state.teamsFiltered
            : state.filterApi
            ? state.allDriversBackup
            : state.allDriversBackup;
          apiFilter = trueSourceData.filter((d) => d.api === true);

          return {
            ...state,
            allDrivers: apiFilter,
            apiOrDbFiltered: apiFilter,
            filterApi: true,
          };

        case "false":
          const falseSourceData = state.paginateSearch
            ? state.driversSearch
            : state.filterTeams
            ? state.teamsFiltered
            : state.filterApi
            ? state.allDriversBackup
            : state.allDriversBackup;
          apiFilter = falseSourceData.filter((d) => d.api === false);

          return {
            ...state,
            allDrivers: apiFilter,
            apiOrDbFiltered: apiFilter,
            filterApi: true,
          };

        default:
          return state;
      }

    case ORDER_NAME:
      let sortedDrivers = [];

      //Order con api
      if (state.filterApi) {
        if (action.payload === "A-Z") {

          sortedDrivers = state.apiOrDbFiltered.slice().sort((a, b) => {
            var nameA = a.forename.toLowerCase();
            var nameB = b.forename.toLowerCase();

            return nameA.localeCompare(nameB);
          });
        } else if (action.payload === "Z-A") {

          sortedDrivers = state.apiOrDbFiltered.slice().sort((a, b) => {
            var nameA = a.forename.toLowerCase();
            var nameB = b.forename.toLowerCase();

            return nameB.localeCompare(nameA);
          });
        }

        return {
          ...state,
          orderValue: true,
          driversOrderbackup: sortedDrivers,
          allDrivers: sortedDrivers.slice(0, ITEMS_PER_PAGE),
          currentPage: 0,
        };
      }

      //order con teams
      if (state.filterTeams) {
        if (action.payload === "A-Z") {

          sortedDrivers = state.teamsFiltered.slice().sort((a, b) => {
            var nameA = a.forename.toLowerCase();
            var nameB = b.forename.toLowerCase();

            return nameA.localeCompare(nameB);
          });
        } else if (action.payload === "Z-A") {

          sortedDrivers = state.teamsFiltered.slice().sort((a, b) => {
            var nameA = a.forename.toLowerCase();
            var nameB = b.forename.toLowerCase();

            return nameB.localeCompare(nameA);
          });
        }

        return {
          ...state,
          orderValue: true,
          driversOrderbackup: sortedDrivers,
          allDrivers: sortedDrivers.slice(0, ITEMS_PER_PAGE),
          currentPage: 0,
        };
      }

      // Basic order
      if (action.payload === "A-Z") {

        sortedDrivers = state.allDriversBackup.slice().sort((a, b) => {
          var nameA = a.forename.toLowerCase();
          var nameB = b.forename.toLowerCase();

          return nameA.localeCompare(nameB);
        });
      } else if (action.payload === "Z-A") {

        sortedDrivers = state.allDriversBackup.slice().sort((a, b) => {
          var nameA = a.forename.toLowerCase();
          var nameB = b.forename.toLowerCase();

          return nameB.localeCompare(nameA);
        });
      }
      return {
        ...state,
        orderValue: true,
        driversOrderbackup: sortedDrivers,
        allDrivers: sortedDrivers.slice(0, ITEMS_PER_PAGE),
        currentPage: 0,
      };

    case ORDER_DATE:
      let orderDate = [];

        //Order con api
        if (state.filterTeams) {
          if (action.payload === "mayor") {
            orderDate = state.teamsFiltered
              .slice()
              .sort((a, b) => new Date(a.dob) - new Date(b.dob));
          } else {
            orderDate = state.teamsFiltered
              .slice()
              .sort((a, b) => new Date(b.dob) - new Date(a.dob));
          }
    
          return {
            ...state,
            orderValue: true,
            driversOrderbackup: orderDate,
            allDrivers: orderDate.slice(0, ITEMS_PER_PAGE),
            currentPage: 0,
          };
        }
  
        //order con teams
        if (state.filterApi) {
          if (action.payload === "mayor") {
            orderDate = state.apiOrDbFiltered
              .slice()
              .sort((a, b) => new Date(a.dob) - new Date(b.dob));
          } else {
            orderDate = state.apiOrDbFiltered
              .slice()
              .sort((a, b) => new Date(b.dob) - new Date(a.dob));
          }
    
          return {
            ...state,
            orderValue: true,
            driversOrderbackup: orderDate,
            allDrivers: orderDate.slice(0, ITEMS_PER_PAGE),
            currentPage: 0,
          };
        }



      if (action.payload === "mayor") {
        orderDate = state.allDriversBackup
          .slice()
          .sort((a, b) => new Date(a.dob) - new Date(b.dob));
      } else {
        orderDate = state.allDriversBackup
          .slice()
          .sort((a, b) => new Date(b.dob) - new Date(a.dob));
      }

      return {
        ...state,
        orderValue: true,
        driversOrderbackup: orderDate,
        allDrivers: orderDate.slice(0, ITEMS_PER_PAGE),
        currentPage: 0,
      };

    case RESET:
      return {
        ...state,
        allDrivers: [...state.allDriversBackup].splice(0, ITEMS_PER_PAGE),
        currentPage: 0,
        teamsFiltered: [],
        apiOrDbFiltered: [],
        paginateSearch: false,
        filterApi: false,
        filterTeams: false,
        paginateInit: false,
        orderValue: false,
      };

    default:
      return state;
  }
}
export default rootReducer;
