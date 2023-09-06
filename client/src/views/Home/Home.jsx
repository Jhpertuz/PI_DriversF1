import { useDispatch, useSelector } from "react-redux";
import Cards from "../../components/Cards/Cards";
import React, { useEffect } from "react";
import { getTeams, getDrivers,} from "../../Redux/Actions/actions";

function Home() {
  console.log("ENTRO")
  const dispatch = useDispatch();
  const allDrivers = useSelector((state) => state.allDrivers);
  useEffect(() => {
    dispatch(getDrivers());
    dispatch(getTeams());
    
  }, []);

  return (    
    <div className="home-cont">
      <h1>estamos en home</h1>
      
      <Cards info={allDrivers} />
    </div>
  );
}

export default Home;
