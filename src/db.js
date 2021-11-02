import { auth, db } from "./firebase";
import { ref, set, get,remove, child, update } from "firebase/database";

export const getTrivia = (objectName) => {
  const planetRef = ref(db, `planets/${objectName}`);
  return get(child(planetRef, "trivia")).then((snapshot) => {
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      console.log("No data available");
    }
  });
};

export const getQuestions = (objectName) => {
  const planetRef = ref(db, `planets/${objectName}`);
  return get(child(planetRef, "questions")).then((snapshot) => {
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      console.log("No data available");
    }
  });
};

export const getObjectByName = (objectName) => {
  const planetRef = ref(db, "planets");
  return get(child(planetRef, objectName))
    .then((snapshot) => {
      if (snapshot.exists()) {
        return snapshot.val();
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

export const setUserProgress = (progress) => {
  console.log("Saving user data");
  const userRef = ref(db, `users/${auth.currentUser.uid}/progress`);
  set(userRef, progress).then((s)=>{
    console.log(s)
  })
};

export const getUserProgress = () => {
  const userRef = ref(db, `users/${auth.currentUser.uid}/progress`);
  get(userRef)
    .then((snapshot) => {
      if (snapshot.exists()) {
        return snapshot.val();
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

export const updateUserProgress = (progressUpdate) => {
  console.log("Updating user data");

  const userRef = ref(db, `users/${auth.currentUser.uid}/progress`);
  
  update(userRef, progressUpdate)
};

export const removeUserProgress = () => {
  console.log("Updating user data");

  const userRef = ref(db, `users/${auth.currentUser.uid}/progress`);

  remove(userRef);
};
