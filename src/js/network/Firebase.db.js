import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import firebaseConfig from './Firebase.config'

firebase.initializeApp(firebaseConfig)
//firebase.auth().languageCode = "fr"
firebase.firestore().settings({ timestampsInSnapshot: true });

export default firebase;
