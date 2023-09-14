import React from "react";
import { Link } from "react-router-dom";
import style from "./Card.module.css";

const Card = ({ id, forename, lastname, image_url, teams }) => {
  return (
    <div className={style.cardContainer}>
      <div className={style.fondoProfile}>
        <img
          className={style.profillepicture}
          src={image_url}
          alt="Profile Picture"
        />
      </div>
      <div className={style.cardinfo}>
        <div className={style.nombre}>Nombre:</div>
        <div className={style.cardname}> {forename + " " + lastname}</div>
        <div className={style.escuderia}>Escuderia:</div>
        <div className={style.cardteams}>{teams.join(" |♦| ")}</div>
        <Link to={`/detail/${id}`}>
          <div className={style.button}>
            <div className={style.vermas}>VER MAS</div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Card;
