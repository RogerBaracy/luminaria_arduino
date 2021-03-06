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
  const yellow = new five.Led(8);
  const green = new five.Led(9);
  const red = new five.Led(10);

  db.ref("color").on("value", (snapshot) => {
    const color = snapshot.val();
    switch (color) {
      case "amarelo":
        yellow.on();
        break;
      case "verde":
        green.on();
        break;
      case "vermelho":
        red.on();
        break;
      case "ligar":
        yellow.on();
        green.on();
        red.on();
        break;
      case "desligar":
        yellow.off();
        green.off();
        red.off();
        break;
    }
  });
});
