import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
import App from './App';
import firebase from 'firebase';


        // Initialize Firebase
var config = {
    apiKey: "AIzaSyC_gOhczkQgExii53hZ7sOnx2LWoRW7TDA",
    authDomain: "react-todolist-cdef2.firebaseapp.com",
    databaseURL: "https://react-todolist-cdef2.firebaseio.com",
    projectId: "react-todolist-cdef2",
    storageBucket: "react-todolist-cdef2.appspot.com",
    messagingSenderId: "396811740973"

  };
  

  firebase.initializeApp(config);





ReactDOM.render(<App />, document.getElementById('root'));

