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

const auth = firebase.auth();
const firestore = firebase.firestore();

function App() {
  return (
    <div className='App'>
      <header>
        <h1>This is a Chat Service</h1>
        <SignOut />
      </header>
    </div>

  );
}

function SignIn(){

}

function SignOut(){

}

export default App;
