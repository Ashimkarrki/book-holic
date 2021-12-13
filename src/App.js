import Nav from "./component/Nav";
import Sidebar from "./component/Sidebar";
import "./App.css";
import OneBook from "./pages/OneBook";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import LogIn from "./pages/LogIn";
import LogOut from "./pages/LogOut";
import { Routes, Route } from "react-router-dom";
import { useGlobalContext } from "./reducer and context/context";
import Library from "./pages/Library";
import OneBook2 from "./pages/Onebook2";
import BookStatus from "./pages/BookStatus";
import Rated from "./pages/Rated";
function App() {
  const { openSidebar } = useGlobalContext();
  return (
    <div className="app">
      <Nav />
      {openSidebar && <Sidebar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/logout" element={<LogOut />} />
        <Route path="/library" element={<Library />} />
        <Route path="/bookstatus" element={<BookStatus />} />
        <Route path="/rated" element={<Rated />} />
        <Route path="/onebook2/:isbn" element={<OneBook2 />} />

        <Route path="/oneBook/:bookname/:id" element={<OneBook />} />
      </Routes>
    </div>
  );
}

export default App;
