import React, {  useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getDriver } from "../../Redux/Actions/actions";
import './style.css';
import background from "../../assets/Images/detail__background.jpg"


const useGetDriver = () => {
	const { id } = useParams();
	const dispatch = useDispatch();
    const driver = useSelector((state) => state.driverDetails);

	useEffect(() => {
		dispatch(getDriver(id));
	}, [dispatch, id]);

	return driver;
};


const DriverDetail = () => {
    const driver = useGetDriver();


 


if (!driver) {
    return <p>Loading...</p>;

}


  return (

        
    <div className="detail-page">
    <img className="backgroundimage" src={background} />
    <div className="info-group">
      <div className="description-container">
        <div className="rectangle-9"></div>
        <div className="frame-6">
          <div className="description-title">※ Descripción</div>
          <div className="rectangle-10"></div>
          <div className="description-text">{driver.description}
          </div>
        </div>
      </div>
      <div className="tabla-general">
        <div className="tabla">
          <div className="rectangle-2"></div>
          <div className="rectangle-3"></div>
          <div className="rectangle-5"></div>
          <div className="rectangle-4"></div>
          <div className="rectangle-6"></div>
          <div className="rectangle-7"></div>
          <div className="rectangle-8"></div>
        </div>
        <div className="texto-fijo">
          <div className="titulo-general">※ Información General</div>
          <div className="nacionalidad">Nacionalidad</div>
          <div className="fecha-de-nacimiento">Fecha de Nacimiento</div>
          <div className="escuder-as">Escuderías.</div>
        </div>
        <div className="variables">
          <div className="dob">{driver.dob}</div>
          <div className="nationality">{driver.nationality}</div>
          <div className="teams">{driver.teams}
          </div>
        </div>
      </div>
    </div>
    <div className="card-container">
      <div className="card-form"></div>
      <div className="card-info">
        <div className="name">{driver.forename + " "+driver.lastname}</div>
        <div className="id">ID: {driver.id}</div>
      </div>
      <img className="image-profile" src={driver.image_url} />
    </div>
  </div>
  
  );
};

export default DriverDetail;
