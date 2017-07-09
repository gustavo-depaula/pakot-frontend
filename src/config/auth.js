import { ref, firebaseAuth } from './constants'

export function auth (email, pw) {
  return firebaseAuth().createUserWithEmailAndPassword(email, pw)
    .then(saveUser)
}

export function logout () {
  return firebaseAuth().signOut()
}

export function login (email, pw) {
  return firebaseAuth().signInWithEmailAndPassword(email, pw)
}

export function resetPassword (email) {
  return firebaseAuth().sendPasswordResetEmail(email)
}

export function saveUser (user) {
  return ref.child(`users/${user.uid}`)
    .set({
      email: user.email,
      uid: user.uid,
      name: '',
      organization: '',
      profilePicture: '',
      credits: 10,
      paymentAdded: false,
      isEditing: '',
      savedAbstracts: false,
      collaborators: []
    })
    .then(() => user)
}

export function firebaseDelete (ref) {
    firebase.database().ref(ref).set(null);
}

export function checkIfUserExists (user) {
    firebase.database().ref('/users/').once('value', function(snapshot) {
      if (snapshot.hasChild(user.uid)) {
        //
      } else {
        var userData = {
          name: user.displayName,
          email: user.email,
          profilePicture: user.photoURL,
          uid: user.uid,
          credits: 10,
          paymentAdded: false,
          isEditing: '',
          savedAbstracts: false,
          collaborators: []
        };
        firebase.database().ref('users/' + user.uid).set(userData);
      }
    });
  }