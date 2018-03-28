import * as firebase from 'firebase'

// Initialize Firebase
// TODO: Replace with your project's customized code snippet
var config = {
  apiKey: 'AIzaSyCOPw5BAlqDedn-7dV1lL85gIn5qM-SMKM',
  authDomain: 'online-shop-qwerty.firebaseapp.com',
  databaseURL: 'https://online-shop-qwerty.firebaseio.com',
  projectId: 'online-shop-qwerty',
  storageBucket: 'online-shop-qwerty.appspot.com',
  messagingSenderId: '392871438394'
}

firebase.initializeApp(config)

// To apply the default browser preference instead of explicitly setting it.
firebase.auth().useDeviceLanguage()