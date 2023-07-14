import { initializeApp } from 'firebase/app';
import {
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
} from 'firebase/auth';
import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
    collection,
    writeBatch,
    query,
    getDocs,
} from 'firebase/firestore';

/** ********************************************
 * generated firebase configuration
 ********************************************* */
const firebaseConfig = {
    apiKey: 'AIzaSyCmytPfI3q9esRE5qxIkcXh_PsYodIvw4k',
    authDomain: 'crwn-clothing-db-21adb.firebaseapp.com',
    projectId: 'crwn-clothing-db-21adb',
    storageBucket: 'crwn-clothing-db-21adb.appspot.com',
    messagingSenderId: '99728193562',
    appId: '1:99728193562:web:7531f8492d8432b371f9a3',
};

/** ********************************************
 * initialize a firebase application
 ********************************************* */
const firebaseApp = initializeApp(firebaseConfig);

/** ********************************************
 * init authentication provided (e.g. Google)
 ********************************************* */
const googleProvider = new GoogleAuthProvider();

/** ********************************************
 * set up the paramaters for the authorization provider
 ********************************************* */
googleProvider.setCustomParameters({
    prompt: 'select_account',
});

/** ********************************************
 * create an authorization instance
 ********************************************* */
export const auth = getAuth();

/** ********************************************
 * create an authorization method/flow (Google Popup)
 ********************************************* */
export const signInWithGooglePopup = async () =>
    signInWithPopup(auth, googleProvider);

/** ********************************************
 * create an authorization method/flow (Google Redirect)
 ********************************************* */
export const signInWithGoogleRedirect = async () =>
    signInWithRedirect(auth, googleProvider);

/** ********************************************
 * sign-in user with email and password
 ********************************************* */
export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return; // exit function if email or password is null
    return signInWithEmailAndPassword(auth, email, password); // else sign-in auth user
};

/** ********************************************
 * create user with email and password flow
 ********************************************* */
export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return; // exit function if email or password is null
    return createUserWithEmailAndPassword(auth, email, password); // else create user account
};

/** ********************************************
 * initialize a firestore db instance
 ********************************************* */
export const db = getFirestore();

/** ********************************************
 * create user document
 ********************************************* */
export const createUserDocumentFromAuth = async (userAuth, additionalInfo) => {
    if (!userAuth) return;

    // create user doc ref
    const userDocRef = doc(db, 'users', userAuth.uid);

    // get user doc ref
    const userSnapshot = await getDoc(userDocRef);

    // if user data doesn't exist
    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInfo,
            });
        } catch (error) {
            console.log('error creating the user', error.message);
        }
    }

    // if user data exist
    return userDocRef;
};

/** ********************************************
 * sign out auth user
 ********************************************* */
export const SignOutUser = async () => signOut(auth);

/** ********************************************
 * adds an observer for changes to the user's sign-in state
 ********************************************* */
export const onAuthStateChangedListener = (callback) =>
    onAuthStateChanged(auth, callback);

/** ********************************************
 * adds collection and documents (batch)
 * collectionKey => name of the collection
 * objectsToAdd => actual data (json) we want to add
 * Note: useEffect() to run the function
 ********************************************* */
export const addCollectionAndDocuments = async (
    collectionKey,
    objectsToAdd
) => {
    // create a collection reference instance
    const collectionRef = collection(db, collectionKey);

    // create a write batch
    const batch = writeBatch(db);

    // iterate through each object
    objectsToAdd.forEach((object) => {
        // create a document reference instance
        const docRef = doc(collectionRef, object.title.toLowerCase());

        // write the object to the document
        batch.set(docRef, object);
    });

    // commit all the writes as a single atomic unit (transaction)
    await batch.commit();
    console.log('batch commit done');
};

/** ********************************************
 * query to get collections and documents
 ********************************************* */
export const getCategoriesAndDocuments = async () => {
    // create a collection reference instance (categories)
    const collectionRef = collection(db, 'categories');

    // create a query instance based on the collection reference
    const q = query(collectionRef);

    // execute the query and get the results
    const querySnapshot = await getDocs(q);

    // create a hashtable based on the queried result
    const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
        const { title, items } = docSnapshot.data();
        acc[title.toLowerCase()] = items;
        return acc;
    }, {});

    // return created hastable
    return categoryMap;
};
