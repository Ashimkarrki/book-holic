import React, { useReducer, useContext, useEffect } from "react";
import App from "../App";
import reducer from "./reducer";
const url = "https://www.googleapis.com/books/v1/volumes?q=";
const apiKey = "AIzaSyBGiwbvE0SI4x9H2X2DJMGL2sjQMn4M9NU";
const AppContext = React.createContext();
const initialState = {
  bookName: "",
  searchBookInfo: {},
  searchLoading: true,
};
const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const firstRender = React.useRef(true);
  const setBookName = (x) => {
    dispatch({ type: "SET-BOOK-NAME", payload: x });
  };
  const fetchBookById = async () => {
    const response = await fetch(
      url + "intitle:" + state.bookName + "&key=" + apiKey
    );
    const convert = await response.json();
    dispatch({ type: "INSTALL-SEARCH-BOOKS", payload: convert });
  };
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    fetchBookById();
  }, [state.bookName]);
  return (
    <AppContext.Provider value={{ ...state, setBookName }}>
      {children}
    </AppContext.Provider>
  );
};
const useGlobalContext = () => {
  return useContext(AppContext);
};
export { useGlobalContext, AppProvider };
