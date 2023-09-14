import { Route, BrowserRouter, Routes } from "react-router-dom";
import Home from "./views/Home/Home";
import DriverDetail from "./components/DetailPage/DetailPage";
import { NavBar } from "./components/Navbar/NavBar";

function App() {
  return (
    <div>
      <BrowserRouter>
      <NavBar/>
        <Routes>
          <Route path={"*"} element={NavBar} />
          <Route path="/" element={<Home />} />
          <Route path="/detail/:id" element={<DriverDetail />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
