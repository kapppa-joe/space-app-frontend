import { auth, db } from "./firebase";
import { ref, set, get, remove, child, update } from "firebase/database";

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
  const userRef = ref(db, `progress/${auth.currentUser.uid}`);
  return set(userRef, progress).then((s) => {
    console.log(s);
  });
};

export const getUserProgress = () => {
  const userRef = ref(db, `progress/${auth.currentUser.uid}`);
  return get(userRef)
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

export const setUserAvatar = (avatar) => {
  const userRef = ref(db, `avatar/${auth.currentUser.uid}`);
  return set(userRef, avatar);
};

export const getUserAvatar = () => {
  const userRef = ref(db, `avatar/${auth.currentUser.uid}`);
  return get(userRef)
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
  const userRef = ref(db, `progress/${auth.currentUser.uid}`);
  return update(userRef, progressUpdate);
};

export const removeUserProgress = () => {
  const userRef = ref(db, `progress/${auth.currentUser.uid}`);
  return remove(userRef);
};
