import firebase from 'firebase/app';
import 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyDTd_ciKAft_pcd55t-DqURyVekGatRE0Y",
  authDomain: "tutor-e223b.firebaseapp.com",
  databaseURL: "https://tutor-e223b.firebaseio.com",
  projectId: "tutor-e223b",
  storageBucket: "tutor-e223b.appspot.com",
  messagingSenderId: "821658884925",
  appId: "1:821658884925:web:e6e9cbf61cb310b2d98354",
  measurementId: "G-41HQ2JYNZ6"
};

const app = firebase.initializeApp(firebaseConfig);
export default app;
