import Nav from "./component/Nav";
import Sidebar from "./component/Sidebar";
import "./App.css";
import Home from "./pages/Home";
function App() {
  return (
    <div className="app">
      <Nav />
      <Sidebar />
      <Home />
    </div>
  );
}

export default App;
