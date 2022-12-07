import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD4tZf6JoAkok9oLQOP5E0DbnAYG84KHrk",
  authDomain: "celestial-typer.firebaseapp.com",
  projectId: "celestial-typer",
  storageBucket: "celestial-typer.appspot.com",
  messagingSenderId: "756075948824",
  appId: "1:756075948824:web:e3a09124a3fc1c55dc4c6d",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const authProvider = new GoogleAuthProvider();

export function signInWithGoogle(): void {
  signInWithPopup(auth, authProvider);
}
export function signOut(): void {
  auth.signOut();
}
