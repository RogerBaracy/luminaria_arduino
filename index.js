import firebase from "firebase";
import five from "johnny-five";
import dotenv from "dotenv";
dotenv.config();

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  databaseURL: process.env.DATABASE_URL,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// Initialize Arduíno
const board = new five.Board();
board.on("ready", function () {
  const led = new five.Led(13);
  db.ref("status").on("value", snapshot => {
    snapshot.val() === true ? led.on() : led.off();
  });
});
