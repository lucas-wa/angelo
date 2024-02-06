import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth"
import { getDatabase, ref, set, get } from "firebase/database"

const firebaseConfig = {
  apiKey: "AIzaSyD36ojmlflrpXs-fvnAuC3AyhbuhaFacaw",
  authDomain: "angelo-43fb3.firebaseapp.com",
  projectId: "angelo-43fb3",
  storageBucket: "angelo-43fb3.appspot.com",
  messagingSenderId: "701376186595",
  appId: "1:701376186595:web:4b58e4dd30704b70481dd6",
  measurementId: "G-L1P213YDTR"
};

const app = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
const auth = getAuth();

export const userSignIn = async (user, setUser) => {

  try {
    const response = await signInWithPopup(auth, provider);

    if (response.ok) {
      setUser(response);
    }

  } catch (error) {
    console.log(error)
  }

}

export const getUser = async (setUser) => {
  auth.onAuthStateChanged(async (user) => {
    setUser(user);
  }, []);
}

export const userSignOut = async () => signOut(auth);

export const saveUserImage = async (imageUri) => {

  const database = getDatabase();

  const userUid = auth.currentUser.uid;

  console.log(userUid, imageUri)
  
  await set(ref(database, "users/" + userUid, "images/"), {
    imageUri
  })

}
