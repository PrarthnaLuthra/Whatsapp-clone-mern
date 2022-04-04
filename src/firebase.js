// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
const firebaseConfig = {
  apiKey: "AIzaSyCEltMnw-95Ci0czB7RFlUtzZnH_RnJx9s",
  authDomain: "whatsapp-mern-clone-88521.firebaseapp.com",
  projectId: "whatsapp-mern-clone-88521",
  storageBucket: "whatsapp-mern-clone-88521.appspot.com",
  messagingSenderId: "610928607596",
  appId: "1:610928607596:web:39a73d4dadc06d118f3349",
  measurementId: "G-8PJ0RL8F5B"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const Authdb = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider};
export default Authdb;
