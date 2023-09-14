import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { searchDrivers,resetDrivers } from "../../Redux/Actions/actions";
import logof1 from "../../assets/Images/F1.png";
import formIcon from "../../assets/Images/newForm.png";
import homeIcon from "../../assets/Images/homButton.png";
import seartchIcon from "../../assets/Images/Search.png";
import { Link } from "react-router-dom";

import "./style.css";

export const NavBar = () => {
  const dispatch = useDispatch();
  const [input, setInput] = useState("");

  const handleChange = (event) => {
    setInput(event.target.value);
  };

  const handleSearch = async () => {
    dispatch(searchDrivers(input));
  };

  const handleReset = ()=>{
    dispatch(resetDrivers())
  }

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };
  return (
    <div className="nav-bar">
      <div className="frame-1">
        <div className="logo">
          <img className="logo-f-1" src={logof1} />
        </div>

        <div className="home-button">
          <div className="homebutt" onClick={handleReset}>
            <Link to={`/home`}>
              <div className="home-button-box"></div>
              <img className="home-icon" src={homeIcon} />
              <div className="home-label">Inicio</div>
            </Link>
          </div>{" "}
        </div>

        <div className="new-driver-button">
          <div className="formbutt">
          <Link to={`/form`}>

            <div className="new-driver-box"></div>
            <img className="form-icon" src={formIcon} />
            <div className="new-driver-label">Nuevo conductor</div>
            </Link>
          </div>
        </div>
        <div className="search-input">
          <input
            className="input-search"
            type="search"
            value={input}
            onChange={(event) => handleChange(event)}
            onKeyDown={handleKeyDown}
            placeholder="Buscar Conductor..."
          />
          <Link to={`/home`}>
          <div className="search-image-container" onClick={handleSearch}>
            <img className="search-img" src={seartchIcon} />
          </div>
          </Link>
       
        </div>
      </div>
    </div>
  );
};
