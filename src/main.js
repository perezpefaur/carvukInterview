import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCRbot5d1NqLkxIafE7s7dguHMcGdmNvYQ",
  authDomain: "carvuk-df72f.firebaseapp.com",
  projectId: "carvuk-df72f",
  storageBucket: "carvuk-df72f.appspot.com",
  messagingSenderId: "216985126103",
  appId: "1:216985126103:web:819bb370cc24cf387cdc92",
  measurementId: "G-JDMGVBK5P1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
getAnalytics(app);

createApp(App).use(store).use(router).mount('#app')
