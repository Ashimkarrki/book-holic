import React, { useReducer, useContext, useEffect } from "react";
import { auth } from "../firebase/initialization";
import {
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import {
  collection,
  getFirestore,
  doc,
  setDoc,
  getDoc,
  arrayUnion,
  updateDoc,
  getDocs,
} from "firebase/firestore";

import reducer from "./reducer";
const url = "https://www.googleapis.com/books/v1/volumes?q=";
const apiKey = "AIzaSyBGiwbvE0SI4x9H2X2DJMGL2sjQMn4M9NU";
const AppContext = React.createContext();
const initialState = {
  bookName: "",
  searchBookInfo: {},
  searchLoading: true,
  openSidebar: false,
  currentUser: "",
};
const AppProvider = ({ children }) => {
  const db = getFirestore();

  const [user, setUser] = React.useState();
  const [userInfo, setUserInfo] = React.useState({
    userName: "",
    library: [],
    bookStatus: [],
    rated: [],
    // comment: [],
    review: [],
  });
  const [state, dispatch] = useReducer(reducer, initialState);
  const firstRender = React.useRef(true);

  const addToLibrary = (x) => {
    const colRef = collection(db, "user");

    if (userInfo.library.includes(x)) {
      setUserInfo({
        ...userInfo,
        library: userInfo.library.filter((s) => {
          return s != x;
        }),
      });
      return setDoc(doc(colRef, user.uid), {
        ...userInfo,
        library: userInfo.library.filter((s) => {
          return s != x;
        }),
      });
    }
    setUserInfo({ ...userInfo, library: [...userInfo.library, x] });
    return setDoc(doc(colRef, user.uid), {
      ...userInfo,
      library: [...userInfo.library, x],
    });
  };

  const addRating = (bookId, rating) => {
    const colRef = collection(db, "user");
    const temp = userInfo.rated.filter((s) => {
      return s.bookId != bookId;
    });
    if (rating === "none") {
      setUserInfo({
        ...userInfo,
        rated: [...temp],
      });
      return setDoc(doc(colRef, user.uid), {
        ...userInfo,
        rated: [...temp],
      });
    }

    setUserInfo({
      ...userInfo,
      rated: [
        ...temp,
        {
          bookId,
          rating,
        },
      ],
    });
    return setDoc(doc(colRef, user.uid), {
      ...userInfo,
      rated: [
        ...temp,
        {
          bookId,
          rating,
        },
      ],
    });
  };
  const addBookStatus = (bookId, status) => {
    const colRef = collection(db, "user");

    const temp = userInfo.bookStatus.filter((s) => {
      return s.bookId != bookId;
    });
    if (status === "none") {
      setUserInfo({
        ...userInfo,
        bookStatus: [...temp],
      });
      return setDoc(doc(colRef, user.uid), {
        ...userInfo,
        bookStatus: [...temp],
      });
    }
    setUserInfo({
      ...userInfo,
      bookStatus: [
        ...temp,
        {
          bookId: bookId,
          status: status,
        },
      ],
    });
    return setDoc(doc(colRef, user.uid), {
      ...userInfo,
      bookStatus: [
        ...temp,
        {
          bookId: bookId,
          status: status,
        },
      ],
    });
  };
  const setBookName = (x) => {
    dispatch({ type: "SET-BOOK-NAME", payload: x });
  };
  const toggleSidebar = () => {
    dispatch({ type: "TOGGLE-SIDEBAR" });
  };
  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const logIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };
  const fetchBookById = async () => {
    const response = await fetch(
      url + "intitle:" + state.bookName + "&key=" + apiKey
    );
    const convert = await response.json();
    dispatch({ type: "INSTALL-SEARCH-BOOKS", payload: convert });
  };
  const logOut = () => {
    setUserInfo({
      userName: "",
      library: [],
      bookStatus: [],
      // comment: [],
      rated: [],
      review: null,
    });
    return signOut(auth);
  };
  const addComment = async (bookId, comment) => {
    const colRef1 = collection(db, "comments");
    const colRef2 = collection(db, "user");
    const docRef = doc(colRef1, bookId);
    setUserInfo({
      ...userInfo,
      review: [...userInfo.review, { bookId, comment }],
    });
    const docu = await getDoc(docRef);
    if (docu.exists()) {
      updateDoc(doc(colRef1, bookId), {
        commentField: arrayUnion({ userName: userInfo.userName, comment }),
      });
    } else {
      setDoc(doc(colRef1, bookId), {
        commentField: [{ userName: userInfo.userName, comment }],
      });
    }

    return setDoc(doc(colRef2, user.uid), {
      ...userInfo,
      review: [...userInfo.review, { bookId, comment }],
    });
  };
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      console.log(user);
      if (user) {
        const docRef = doc(db, "user", user.uid);
        getDoc(docRef).then((snapshot) => {
          setUserInfo(snapshot.data());
        });
      }

      dispatch({ type: "SET-CURRENT-USER", payload: user });
    });
    return () => {
      unSubscribe();
    };
  }, []);
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    fetchBookById();
  }, [state.bookName]);
  return (
    <AppContext.Provider
      value={{
        ...state,
        toggleSidebar,
        setBookName,
        createUser,
        logIn,
        logOut,
        user,
        addToLibrary,
        setUser,
        userInfo,
        addBookStatus,
        addRating,
        userInfo,
        addComment,
        // pushToFirebase,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
const useGlobalContext = () => {
  return useContext(AppContext);
};
export { useGlobalContext, AppProvider };
