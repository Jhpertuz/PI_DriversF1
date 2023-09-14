import { React } from "react";
import Card from "../Card/Card";
import style from "./Cards.module.css";

const Cards = ({ info }) => {
  return (
    <div className={style.cardsContainer}>
      {info?.map((driver) => (
        <Card
          key={driver.id}
          id={driver.id}
          forename={driver.forename}
          lastname={driver.lastname}
          image_url={driver.image_url}
          teams={driver.teams}
        />
      )).slice()}
    </div>
  );
};

export default Cards;
