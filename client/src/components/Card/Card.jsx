import React from "react";
import { Link } from "react-router-dom";
import style from "./Card.module.css";

const Card = ({ id, forename, lastname, image_url, teams }) => {
  return (
    <div className={style.cardContainer}>
      <div className={style.cardImage}>
        <img src={image_url} alt="Profile Picture" />
      </div>

      <div className={style.cardName}>
        <Link to={`/details/${id}`}>
          <h4>
            {forename+" "+lastname}
          </h4>
        </Link>
      </div>

      <div className={style.cardTeams}>
        <label>
          <b>Escuadra:</b>
        </label>
        <p>{teams.join(" |♦| ")}</p>
      </div>
    </div>
  );
};

export default Card;
