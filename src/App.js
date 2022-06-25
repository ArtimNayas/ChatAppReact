import './App.css';
import React,{useState,useRef} from "react";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore'; 
import {useAuthState} from 'react-firebase-hooks/auth';



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

  const[user] = useAuthState(auth);

  return (
    <div className='App'>
      <header>
        <h1>This is a Chat Service</h1>
        <SignOut />
      </header>

      <section>
        {user ? <Chatroom /> : <SignIn />}
      </section>

    </div>

  );
}

function SignIn(){

  const signInWithGoogle = () =>{
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }

  return(
    <>
      <button className="sign-in" onClick = {signInWithGoogle}>Sign In With Google</button>
    </>
  )

}

function SignOut(){

  return auth.currentUser && (
    <button className='sign-out' onClick={() => auth.signOut()}>Sign Out</button>
  )

}

function Chatroom(){

  const messagesRef = firestore.collection('messages');
  const query = messagesRef.orderBy('createdAt').limit(25);

  const [messages] = useCollectionData(query, {idField: 'id'})

  return (
    <>
      <main>
        {messages && messages.map(msg => <ChatMessage key = {msg.id} message = {msg}/>)}
      </main>
    </>
  )

}

export default App;
