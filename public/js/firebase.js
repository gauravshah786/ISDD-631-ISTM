// Initialize Firebase
var config = {
  apiKey: "AIzaSyAZYtOuKEYLEP5ZvFAq6teaV46LhKc9cxo",
  authDomain: "isdd-631.firebaseapp.com",
  databaseURL: "https://isdd-631.firebaseio.com",
  projectId: "isdd-631",
  storageBucket: "isdd-631.appspot.com",
  messagingSenderId: "901050328767"
};
firebase.initializeApp(config);

firebase.auth().onAuthStateChanged(user => {
  if (!user) {
    window.user = null;
  }
});
