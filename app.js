import { initializeApp } from "https://www.gstatic.com/firebasejs/11.7.3/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/11.7.3/firebase-auth.js";
import { getFirestore, doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/11.7.3/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDPSHcWPQ3A8vd7iwd2H-T_4RJRBkEsjfI",
  authDomain: "the-pen-bank.firebaseapp.com",
  projectId: "the-pen-bank",
  storageBucket: "the-pen-bank.firebasestorage.app",
  messagingSenderId: "822697196305",
  appId: "1:822697196305:web:c7e03fe86c5aa68487eab0",
  measurementId: "G-RCF71YYY16"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

signInWithPopup(auth, provider)
  .then(async (result) => {
    const user = result.user;
    const uid = user.uid;
    const userDoc = doc(db, "users", uid);
    const userSnap = await getDoc(userDoc);

    if (!userSnap.exists()) {
      const penName = prompt("Enter your Pen Name:");
      const password = prompt("Enter site password:");

      if (password !== "ink") {
        alert("❌ Incorrect password.");
        return;
      }

      await setDoc(userDoc, {
        penName,
        balance: 1000
      });

      document.getElementById("welcome").textContent = `Welcome ${penName}!`;
      document.getElementById("balance").textContent = `Your Balance is $1000 InkCoins.`;
    } else {
      const password = prompt("Enter site password:");

      if (password !== "ink") {
        alert("❌ Incorrect password.");
        return;
      }

      const data = userSnap.data();
      document.getElementById("welcome").textContent = `Welcome ${data.penName}!`;
      document.getElementById("balance").textContent = `Your Balance is $${data.balance} InkCoins.`;
    }
  })
  .catch((error) => {
    console.error("Sign-in error:", error);
  });
