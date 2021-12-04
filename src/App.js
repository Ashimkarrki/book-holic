import Nav from "./component/Nav";
import Sidebar from "./component/Sidebar";
import "./App.css";
import OneBook from "./pages/OneBook";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import { useGlobalContext } from "./reducer and context/context";
function App() {
  const { openSidebar } = useGlobalContext();
  return (
    <div className="app">
      <Nav />
      {openSidebar && <Sidebar />}
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/oneBook/:bookname/:id" element={<OneBook />}></Route>
      </Routes>
    </div>
  );
}

export default App;
