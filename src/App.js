import './App.css';
import React,{useState} from "react";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore'; 
import {useAuthState} from 'react-firebase-hooks/auth';
import {useCollectionData} from 'react-firebase-hooks/firestore';


firebase.initializeApp({
  apiKey: "AIzaSyANSMGjcEWQrvaEFgwd0g9qKTJGDFQhNfo",
  authDomain: "react-chat-app-fbd52.firebaseapp.com",
  projectId: "react-chat-app-fbd52",
  databaseURL: "https://react-chat-app-fbd52.firebaseio.com",
  storageBucket: "react-chat-app-fbd52.appspot.com",
  messagingSenderId: "878948549024",
  appId: "1:878948549024:web:d505a430d8397d6dee64c5",
  measurementId: "G-ZM1C9Y8HB9"
})

const auth = firebase.auth();
const firestore = firebase.firestore();
 
function App() {
  
  const[user] = useAuthState(auth);
  return (
    <div className = "App">
 
      <header>
        <h1>THIS A CHAT SERVER </h1>
        <SignOut />
      </header>
 
      <section>
        {user ? <ChatRoom /> : <SignIn />} 
      </section>
 
    </div>
 
  );
 
}
 
function SignIn(){
 
    const signInWithGoogle = () =>{
      const provider = new firebase.auth.GoogleAuthProvider();
      auth.signInWithPopup(provider);
    }
 
    return (
    <>
    <button className = "sign-in" onClick = {signInWithGoogle}>Sign In with Google </button>
    </>
    )
}
 
function SignOut() {
 
    return auth.currentUser && (
      <button className = "sign-out" onClick = {() => auth.signOut()}>Sign Out</button>
    )
}
 
function ChatRoom(){
 
    //Display the messages
    const messagesRef = firestore.collection('messages');
    const query = messagesRef.orderBy('createdAt').limit(25);
    const [messages] = useCollectionData(query,{idField: 'id'});
 
    const [formValue, setFormValue] = useState('');
 
    const {uid,photoURL} = auth.currentUser;
 
    const sendMessage = async(e) => {
 
        e.preventDefault();
 
        await messagesRef.add({
 
          text : formValue,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
          uid,
          photoURL
        })
        setFormValue('');
 
    }
    return (
 
      <>
        <main>
 
            {messages && messages.map(msg => <ChatMessage key = {msg.id} message = {msg}/>)}
        
        </main>
 
        <form onSubmit = {sendMessage} >
 
          <input value = {formValue} onChange={(e) => setFormValue(e.target.value)} >
          </input>
          <button type = "submit" disabled = {!formValue} > Send Message</button>
        </form>
      </>
 
    )
 
}
 
function ChatMessage(props){
 
    const {text,uid,photoURL} = props.message;
 
    const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';
 
    return (
 
      <>  
        <div className = {`message ${messageClass}`}>
        <img src = {photoURL || 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50'} />
        </div>
        <p>{text}</p>
      </>
 
    )
 
}
 
export default App;