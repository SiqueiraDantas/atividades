// firebaseConfig.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyAGWgkGQglB_uuV0eVnU3FuT0kLe8U7vdw",
  authDomain: "mis-educa.firebaseapp.com",
  projectId: "mis-educa",
  storageBucket: "mis-educa.appspot.com",
  messagingSenderId: "432559485193",
  appId: "1:432559485193:web:5c3ad99c601cea0594a3d8",
  measurementId: "G-VY3DGJSWXB"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { db, auth, storage };
