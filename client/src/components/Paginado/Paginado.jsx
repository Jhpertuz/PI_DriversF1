import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import { page } from "../../Redux/Actions/actions";
import "./style.css";

function Paginado() {
  

  const dispatch = useDispatch();


  const pagination = (e) => {
    dispatch(page(e.target.name));
  };


  let allDrivers=[]  
  let actualPage = (useSelector((state) => state.currentPage)+1);
  allDrivers = useSelector((state)=>state.teamsFiltered)



  return (
    
    <div>
      <div className="pagination">

        <button name="prev" onClick={pagination}>&laquo;</button>

        {actualPage > 1 && <a>{actualPage - 1}</a>} 

        <a className="active">{actualPage}</a>

        {actualPage<(Math.ceil(allDrivers.length / 9))&&<a>{actualPage +1} </a>}

        <button name="next" onClick={pagination}>&raquo;</button>
      </div>
    </div>
  );
}

export default Paginado;
