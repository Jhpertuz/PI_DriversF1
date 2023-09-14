import { useDispatch, useSelector } from "react-redux";
import Cards from "../../components/Cards/Cards";
import React, { useEffect, useState } from "react";
import {
  getTeams,
  getDrivers,
  resetDrivers,
  teamsFilter,
  apiFilter,
  orderByName,
  orderByDate,
} from "../../Redux/Actions/actions";
import Paginado from "../../components/Paginado/Paginado";
import "./style.css";
import clearicon from "../../assets/Images/eraser.png";

function Home() {
  const dispatch = useDispatch();
  const allDrivers = useSelector((state) => state.allDrivers);
  const allTeams = useSelector((state) => state.driversTeams);
  const auxiReload = useSelector((state) => state.newPostCounter);

  //!----------------------handleReset
  const handleReset = () => {
    dispatch(resetDrivers());
    setstateTeamsFilter("DEFAULT");
    setstateApiFilter("DEFAULT");
    setorderDate("DEFAULT")
    setorderName("DEFAULT")
  };
  //!----------------------handleReset

  //*--------------------------------------------------

  const [stateTeamsFilter, setstateTeamsFilter] = useState("DEFAULT");
  const [stateApiFilter, setstateApiFilter] = useState("DEFAULT");
  const [orderDate, setorderDate] = useState("DEFAULT");
  const [orderName, setorderName] = useState("DEFAULT");

  //*--------------------------------------Filtros**
  const handlerFilterTeams = (event) => {
    event.preventDefault();
    const team = event.target.value;

    setstateTeamsFilter(team);
    dispatch(teamsFilter(team));

  };

  const handlerFilterApi = (event) => {
    event.preventDefault();
    const isApi = event.target.value;

    setstateApiFilter(isApi);
    dispatch(apiFilter(isApi));
  };

  //*--------------------------------------Ordenamiento**

  const handlerOrderName = (event) => {
    event.preventDefault();
    const name = event.target.value;
    setorderName(name);
    dispatch(orderByName(name));
  };
  const handlerOrderDate = (event) => {
    event.preventDefault();
    const date = event.target.value;
    setorderDate(date);
    dispatch(orderByDate(date));
  };

  useEffect(() => {
    dispatch(getDrivers());
    dispatch(getTeams());
  }, []);

  useEffect(() => {
    dispatch(getDrivers());
    dispatch(getTeams());
  }, [auxiReload]);

  return (
    <div className="hme">
      <div className="all-components">
        <div className="filters-and-order">
          <div className="filter-order-component">
            <div className="order">
              <div className="order-box"></div>
              <div className="order-by-date">
                <section>
                  <select
                    name="orderDate"
                    value={orderDate}
                    onChange={handlerOrderDate}
                  >
                    <option value="DEFAULT" disabled>
                      Fecha de nacimiento
                    </option>
                    <option value="menor">Ascendente</option>
                    <option value="mayor">Descendente</option>
                  </select>
                </section>
              </div>
              <div className="order-by-name">
                {" "}
                <section>
                  <select
                    name="orderName"
                    value={orderName}
                    onChange={handlerOrderName}
                  >
                    <option value="DEFAULT" disabled>
                      {" "}
                      Alfabetico{" "}
                    </option>
                    <option value="A-Z">A-Z</option>
                    <option value="Z-A">Z-A</option>
                  </select>
                </section>
              </div>

              <div className="ordenamiento">Ordenamiento:</div>
            </div>
            <div className="filters">
              <div className="filter-box"></div>
              <div className="filter-by-api">
                <section>
                  <select
                    name="apiFilter"
                    value={stateApiFilter}
                    onChange={handlerFilterApi}
                  >
                    <option value="DEFAULT" disabled>
                      {" "}
                      Origen{" "}
                    </option>
                    <option value="false">Creados Por Usuario</option>
                    <option value="true">Api Drivers</option>
                  </select>
                </section>
              </div>
              <div className="filter-by-teams">
                <section>
                  <select
                    name="teamsFilter"
                    value={stateTeamsFilter}
                    onChange={handlerFilterTeams}
                  >
                    <option value="DEFAULT" disabled>
                      {" "}
                      Escuderias{" "}
                    </option>
                    {allTeams.map((team) => (
                      <option key={team} value={team}>
                        {" "}
                        {team}{" "}
                      </option>
                    ))}
                  </select>
                </section>
              </div>
              <div className="filtrado">Filtrado:</div>
            </div>
            <div className="reset-button" onClick={handleReset}>
              <div className="clear-button-box"></div>
              <img className="clear-icon" src={clearicon} />
              <div className="clean-filters">Reiniciar Filtros</div>
            </div>
          </div>
        </div>
        <div className="paginate-box">
          <Paginado />
        </div>
        <div className="block-container">
          <div className="cards-container">
            {" "}
            <Cards info={allDrivers} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
