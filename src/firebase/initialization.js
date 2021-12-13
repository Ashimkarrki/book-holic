import { getAuth } from "firebase/auth";

import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCKd1o_y0xWBtsupPJyM4O958ib8QouJeU",
  authDomain: "my-books-8f324.firebaseapp.com",
  projectId: "my-books-8f324",
  storageBucket: "my-books-8f324.appspot.com",
  messagingSenderId: "68736729662",
  appId: "1:68736729662:web:00ffbd51f9faff6ae5c76f",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
