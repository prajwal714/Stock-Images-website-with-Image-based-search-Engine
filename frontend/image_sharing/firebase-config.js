import firebase from 'firebase/app' ;
import 'firebase/storage';

var firebaseConfig = {
    apiKey: "AIzaSyDOCj2ajdcbRjHKjq7Y-qO8jRZcKwt41o4",
    authDomain: "image-sharing-platform-5c6e0.firebaseapp.com",
    databaseURL: "https://image-sharing-platform-5c6e0.firebaseio.com",
    projectId: "image-sharing-platform-5c6e0",
    storageBucket: "image-sharing-platform-5c6e0.appspot.com",
    messagingSenderId: "932900177156",
    appId: "1:932900177156:web:022bb1a881057a1d4e7c51"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

let storage=firebase.storage();
export {
    storage,firebase as default
};