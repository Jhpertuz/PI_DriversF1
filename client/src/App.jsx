import { Route, BrowserRouter, Routes, useLocation } from "react-router-dom";
import Home from "./views/Home/Home";
import DriverDetail from "./components/DetailPage/DetailPage";
import { NavBar } from "./components/Navbar/NavBar";
import Create from "./views/Create/Create"
import Landing from "./views/Landing/Landing";


function ConditionalNavBar() {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  
  return isHomePage ? null : <NavBar />;}
function App() {
  return (
    <div>
      <BrowserRouter>
      <ConditionalNavBar />
        <Routes>
          <Route path={"*"} element={NavBar} />
          <Route path="/" element={<Landing />} />
          <Route path="/home" element={<Home />} />
          <Route path="/detail/:id" element={<DriverDetail />} />
          <Route path="/form" element={<Create/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
