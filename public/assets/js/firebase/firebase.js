// Initialize Firebase

var config = {
  apiKey: "AIzaSyD-J2HLqV3WVjqJZ6T1wJCpvBmezZI87iA",
  authDomain: "hank199599.firebaseapp.com",
  databaseURL: "https://hank199599.firebaseio.com",
  projectId: "hank199599",
  storageBucket: "hank199599.appspot.com",
  messagingSenderId: "382026713515",
  appId: "1:382026713515:web:5cd379be41c149bc31eaee",
  measurementId: "G-XRG9Z7KJ2Q"
};

firebase.initializeApp(config);

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}