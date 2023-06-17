import { initializeApp } from "firebase/app";
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore'

// generated firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCmytPfI3q9esRE5qxIkcXh_PsYodIvw4k",
  authDomain: "crwn-clothing-db-21adb.firebaseapp.com",
  projectId: "crwn-clothing-db-21adb",
  storageBucket: "crwn-clothing-db-21adb.appspot.com",
  messagingSenderId: "99728193562",
  appId: "1:99728193562:web:7531f8492d8432b371f9a3"
};

// initialize a firebase application
const firebaseApp = initializeApp(firebaseConfig)

// init authentication provided (e.g. Google)
const provider = new GoogleAuthProvider()

// set up the paramaters for the authorization provider
provider.setCustomParameters({
  prompt: "select_account"
})

// create an authorization instance
export const auth = getAuth()

// create an authorization method/flow
export const signInWithGooglePopup = () => signInWithPopup(auth, provider)

// initialize a firestore db instance 
export const db = getFirestore()

// create user document
export const createUserDocumentFromAuth = async (userAuth) => 
{
  // create user doc ref
  const userDocRef = doc(db, 'users', userAuth.uid)

  // get user doc ref
  const userSnapshot = await getDoc(userDocRef)

  // if user data doesnn't exist
  if(!userSnapshot.exists()) {
    const {displayName, email} = userAuth
    const createdAt = new Date()

    try {
      await setDoc(userDocRef, {
        displayName, 
        email,
        createdAt
      })
    } catch (error) {
      console.log('error creating the user', error.message);
    }
  }
  
  // if user data exist
  return userDocRef
}