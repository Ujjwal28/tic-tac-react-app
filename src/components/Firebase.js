import * as firebase from "firebase";

// const settings = { timestampsInSnapshots: true };

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_DATABASE_URL,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: "tic-tac-toe-256210",
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID
};
firebase.initializeApp(config);

export default firebase;
