import React from 'react'
import "./landing.css"
import { Link } from 'react-router-dom'

const Landing = () => {
  return (

<div className="frames-1">
  <div className="group-button">
    <div className="frames-2">
    <Link to={`/home`}>
      <div className="button">INICIAR</div>
    </Link>
      <div className="parraf">
        En esta aplicacion conoceras a los mejores corredores de todoe l
        citcuito de fotmula uno, haz Click arriba para iniciar el recorrido por
        nuestra Aplicacion Web
      </div>
    </div>
  </div>
  <div className="group-text">
    <div className="welcome">Bienvenidos a</div>
    <div className="title">F1 Drivers</div>
    <div className="slogan">
      Muchos creen que saber pilotar es saber volantear. Saber pilotar es mucho
      más: es saber frenar. Frenar, hijo, es todo un arte
    </div>
  </div>
</div>


  )
}

export default Landing