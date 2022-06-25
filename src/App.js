import logo from './logo.svg';
import './App.css';
import React,{useState, useRef} from "react";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth'
import 'firebase/compat/auth'


firebase.initializeApp({
  apiKey: "AIzaSyCbhbWct2ZvZfrbsku6w3SuEO4ZzegRWhE",
  authDomain: "react-chat-app-adb4e.firebaseapp.com",
  projectId: "react-chat-app-adb4e",
  databaseURL: "https:/react-chat-app-adb4e.firebaseio.com",
  storageBucket: "react-chat-app-adb4e.appspot.com",
  messagingSenderId: "184170737383",
  appId: "1:184170737383:web:8fa3594d0edc3e03a5bc42",
  measurementId: "G-BZM5FY4XGT"
})

function App() {

  const[color,setColor] = useState("red")

  return (
    <div className = "Cuvette">
      <h1>My favourite colour is {color}</h1>

      <button type = "button"onClick = {() => setColor("blue")}>BLUE</button>
      <button type = "button"onClick = {() => setColor("red")}>RED</button>
    </div>
  );
}

export default App;
