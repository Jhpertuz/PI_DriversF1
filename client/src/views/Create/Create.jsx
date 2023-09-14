import React, { useEffect, useState } from "react";
import "./style.css"
import { useDispatch, useSelector } from "react-redux";
import { getTeams, postDriver,getDrivers } from "../../Redux/Actions/actions";

const Create = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTeams);
    dispatch(getDrivers)
  }, []);

  const driversTeams = useSelector((state) => state.driversTeams);
  const allDrivers = useSelector((state)=>state.allDriversBackup);
  const countrys=allDrivers?.map((d)=>d.nationality)
  const uniqueCountrys = [...new Set(countrys)];

  const [state, setState] = useState({
    forename: "",
    lastname: "",
    dob: "",
    teams: [],
    nationality: [],
    image_url: "",
    description: "",
  });

  const [errors, setErrors] = useState({
    forename: "Nombre es requerido",
    lastname: "Apellido es Requerido",
    dob: "El Formato de año correcto es YYYY-MM-DD",
    teams: "Debe Agregar al menos una escuderia",
    nationality: "Debe Seleccionar una Nacionalidad",
    image_url: "",
    description: "",
  });

  const validate = (state, name) => {
    if (name === "forename") {
      const regex = /^([a-z0-9]+(\/{1}[a-z0-9]+)*)+(?!([\/]{2}))$/;
      if (state.forename === "")
        setErrors({ ...errors, forename: "Nombre es requerido." });
      else if (state.forename.length > 10 || state.forename.length < 3)
        setErrors({
          ...errors,
          forename: "el Nombre del heroe debe contener entre 3 y 10 caracteres",
        });
      else if (!regex.test(state.forename))
        setErrors({
          ...errors,
          forename: "El Nombre no debe contener caracteres especiales.",
        });
      else {
        setErrors({ ...errors, forename: "" });
        return;
      }
    } else if (name === "lastname") {
      const regex = /^([a-z0-9]+(\/{1}[a-z0-9]+)*)+(?!([\/]{2}))$/;
      if (state.lastname === "")
        setErrors({ ...errors, lastname: "Apellido es requerido." });
      else if (state.lastname.length > 10 || state.lastname.length < 3)
        setErrors({ ...errors, lastname: "El Apellido es muy largo." });
      else if (!regex.test(state.lastname))
        setErrors({
          ...errors,
          lastname: "El Apellido no debe contener caracteres especiales.",
        });
      else {
        setErrors({ ...errors, lastname: "" });
        return;
      }
    } else if (name === "dob") {
      const regex = /^\d{4}-\d{2}-\d{2}$/;
      if (!regex.test(state.dob)) {
        setErrors({ ...errors, dob: "No cumple con el formato YYYY-MM-DD." });
      }

      const partesFecha = state.dob.split("-");
      const año = parseInt(partesFecha[0], 10);
      const mes = parseInt(partesFecha[1], 10);
      const dia = parseInt(partesFecha[2], 10);

      if (mes < 1 || mes > 12 || dia < 1 || dia > 31) {
        setErrors({ ...errors, dob: "Mes o día fuera de rango" });
      } else {
        setErrors({ ...errors, dob: "" });
        return;
      }
    } else if (name === "teams") {
      if (state.teams === "") {
        setErrors({
          ...errors,
          teams: "Debe seleccionar al menos una Escuderia",
        });
      } else {
        setErrors({ ...errors, teams: "" });
        return;
      }
    } else if (name === "nationality") {
      if (state.nationality === "") {
        setErrors({
          ...errors,
          nationality: "Debe seleccionar el Pais correspondiente",
        });
      } else {
        setErrors({ ...errors, nationality: "" });
        return;
      }
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "teams") {
      if (state.teams.includes(value)) return;
      setState({ ...state, [name]: [...state[name], value] });
    } else if (name === "nationality") {
      if (state.nationality.includes(value)) return;
      setState({ ...state, [name]: value });
    } else {
      setState({ ...state, [name]: value });
    }

    validate({ ...state, [name]: value }, name);
  }
  
  const disable = () => {
    let auxDisabled = true;
    for (let error in errors) {
      if (errors[error] === "") auxDisabled = false;
      else {
        auxDisabled = true;
        break;
      }
    }
    return auxDisabled;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(postDriver(state));
  };



return(
    <div className="form-cont">
      <form onSubmit={handleSubmit}>
        <label>Nombre: </label>
        <input onChange={handleChange} name="forename" type="text" />
        <label className="form-error">{errors.forename}</label>
        <label>Apellido: </label>
        <input onChange={handleChange} name="lastname" type="text" />
        <label className="form-error">{errors.lastname}</label>
        <label>Imagen: </label>
        <input onChange={handleChange} name="image_url" type="text" />
        <label className="form-error">{errors.image_url}</label>
        <label>Fecha de Nacimiento: </label>
        <input onChange={handleChange} name="dob" type="text" />
        <label className="form-error">{errors.dob}</label>
        <label>Descripcion: </label>
        <input onChange={handleChange} name="description" type="text" />
        <label className="form-error">{errors.description}</label>
        <label>Escuderias: </label>
        <select onChange={handleChange} name="teams" id="teams">
          {driversTeams.map((dt) => (
            <option key={dt} value={dt}>
              {dt}
            </option>
          ))}
        </select>

        <div className="form-info-cont">
          {state.teams.map((t) => (
            <div key={t} className="form-label">
              <p>{t}</p>
            </div>
          ))}
        </div>
        <label>Nacionalidad: </label>
        <select onChange={handleChange} name="nationality" id="nationality">
          {uniqueCountrys.map((uc) => (
            <option key={uc} value={uc}>
              {uc}
            </option>
          ))}
        </select>

        <div className="form-info-cont">         
            <div key={state.nationality} className="form-label">
              {state.nationality.length > 2 &&<p>{state.nationality}</p>}
            </div>
        
        </div>

        <input disabled={disable()} className="form-button" type="submit" />
        </form>
    </div>
);



};


export default Create