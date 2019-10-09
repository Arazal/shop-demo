import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'


const config = {
        apiKey: "AIzaSyB8cSiNQWg7BKaMC5VDrrlBb2jHJwppDNU",
        authDomain: "myshop-db.firebaseapp.com",
        databaseURL: "https://myshop-db.firebaseio.com",
        projectId: "myshop-db",
        storageBucket: "",
        messagingSenderId: "476469039533",
        appId: "1:476469039533:web:76af40ddf393d3f8129124"
}

firebase.initializeApp(config)

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return

    const userRef = firestore.doc(`users/${userAuth.uid}`)

    const snapShot =  await userRef.get()

    if(!snapShot.exists) {
       const  { displayName, email } =  userAuth
       const createdAt = new Date()

       try {
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData
        })
       } catch (error) {
          console.log('error creating user', error.message)
       }
    }

    console.log('userref', userRef)

    return userRef
}



export const auth = firebase.auth()

export const firestore = firebase.firestore()

const provider = new firebase.auth.GoogleAuthProvider()

provider.setCustomParameters({ prompt: 'select_account'})

export const signInWithGoogle = () => auth.signInWithPopup(provider)

export default firebase

