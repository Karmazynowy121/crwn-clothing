import { initializeApp } from 'firebase/app'
import { 
    getAuth, 
    signInWithRedirect, 
    signInWithPopup, 
    GoogleAuthProvider } 
    from 'firebase/auth'
    import {
      getFirestore,
      doc,
      getDoc,
      setDoc
    } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyC7fWHY3oTINb7mYez3zpcf85fWl7o4wPA",
    authDomain: "crwn-clothing-db-32fe0.firebaseapp.com",
    projectId: "crwn-clothing-db-32fe0",
    storageBucket: "crwn-clothing-db-32fe0.appspot.com",
    messagingSenderId: "265650561928",
    appId: "1:265650561928:web:4b7aa7ef61111e9c24103d"
  };
  
  // Initialize Firebase
  const firebaseApp = initializeApp(firebaseConfig);

  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({
    prompt: "select_account"
  });

  export const auth = getAuth();
  export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

  export const db = getFirestore();

  export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);

    const userSnapshot = await getDoc(userDocRef);

    if(!userSnapshot.exists()) {
      const { displayName, email } = userAuth;
      const createdAt = new Date();

      try {
        await setDoc(userDocRef, {
          displayName,
          email,
          createdAt
        });
      } catch (error) {
        console.log('error creating the user', error.message);
      }
    }

    return userDocRef;
  };