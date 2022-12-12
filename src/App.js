import Nav from "./component/Nav";
import Sidebar from "./component/Sidebar";
import "./App.css";
import OneBook from "./pages/OneBook";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import LogIn from "./pages/LogIn";
import LogOut from "./pages/LogOut";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useGlobalContext } from "./reducer and context/context";
import Library from "./pages/Library";
import OneBook2 from "./pages/Onebook2";
import BookStatus from "./pages/BookStatus";
import Rated from "./pages/Rated";
import Loading from "./component/Loading";
import { ToastContainer } from "react-toastify";

function App() {

  const { openSidebar, userLoading } = useGlobalContext();
  if (userLoading) {
    return (
      <div className="loadingKoMathi">
        <Loading />
      </div>
    );
  }
  return (
    <div className="app">
      <ToastContainer />
      <Nav />
      {openSidebar && <Sidebar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/signin"
          element={
            <ProtectedPageV2>
              <SignIn />
            </ProtectedPageV2>
          }
        />
        <Route
          path="/login"
          element={
            <ProtectedPageV2>
              <LogIn />
            </ProtectedPageV2>
          }
        />
        <Route
          path="/logout"
          element={
            <ProtectedPage>
              <LogOut />
            </ProtectedPage>
          }
        />

        <Route
          path="/library"
          element={
            <ProtectedPage>
              <Library />
            </ProtectedPage>
          }
        />
        <Route
          path="/bookstatus"
          element={
            <ProtectedPage>
              <BookStatus />
            </ProtectedPage>
          }
        />
        <Route
          path="/rated"
          element={
            <ProtectedPage>
              <Rated />
            </ProtectedPage>
          }
        />
        <Route path="/onebook2/:isbn" element={<OneBook2 />} />

        <Route path="/oneBook/:bookname/:id" element={<OneBook />} />
      </Routes>
    </div>
  );
}

export default App;
const ProtectedPage = ({ children }) => {
  const { user } = useGlobalContext();
  const location = useLocation();
  if (user) {
    return children;
  } else {
    return <Navigate to="/signin" state={{ from: location }} />;
  }
};
const ProtectedPageV2 = ({ children }) => {
  const { user } = useGlobalContext();
  const location = useLocation();
  if (user) {
    return <Navigate to="/logout" state={{ from: location }} />;
  } else {
    return children;
  }
};
