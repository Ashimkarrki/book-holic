import { getAuth } from "firebase/auth";

import { initializeApp } from "firebase/app";
// const firebaseConfig = {
//   authDomain: process.env.REACT_APP_AUTH_DOMAIN,
//   apiKey: process.env.REACT_APP_API_KEY,
//   projectId: process.env.REACT_APP_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
//   appId: process.env.REACT_APP_APP_ID,
// };
const firebaseConfig = {
  authDomain: "my-books-8f324.firebaseapp.com",
  apiKey: "AIzaSyCKd1o_y0xWBtsupPJyM4O958ib8QouJeU",
  projectId: "my-books-8f324",
  storageBucket: "my-books-8f324.appspot.com",
  messagingSenderId: "68736729662",
  appId: "1:68736729662:web:00ffbd51f9faff6ae5c76f",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
