import { auth, db } from "./firebase";
import { ref, set, get, remove, child, update } from "firebase/database";

export const setDefaults = () => {
  setUserAvatar("");
  setUserNickname("");
  setUserProgress("");
};

export const getTrivia = (objectName) => {
  const planetRef = ref(db, `planets/${objectName}`);
  return get(child(planetRef, "trivia"))
    .then((snapshot) => {
      if (snapshot.exists()) {
        return snapshot.val();
      } else {
        console.log("No data available");
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getQuestions = (objectName) => {
  const planetRef = ref(db, `planets/${objectName}`);
  return get(child(planetRef, "questions"))
    .then((snapshot) => {
      if (snapshot.exists()) {
        return snapshot.val();
      } else {
        console.log("No data available");
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

/*
setProgress structure = {
sun: [],
mercury: [],
venus: [],
earth: [],
mars: [],
jupiter: [],
saturn: [],
uranus: [],
neptune: [],
iss: [],
curiosity-rover: [],
voyager: []
}
*/

export const setUserProgress = (progress) => {
  console.log("setUserProgress called");
  const userRef = ref(db, `progress/${auth.currentUser.uid}`);
  return set(userRef, progress);
};

export const getUserProgress = () => {
  const userRef = ref(db, `progress/${auth.currentUser.uid}`);
  console.log(userRef);
  return get(userRef)
    .then((snapshot) => {
      if (snapshot.exists()) {
        return snapshot.val();
      } else {
        console.log("No data available");
        return undefined;
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

export const setUserNickname = (nickname) => {
  const userRef = ref(db, `nickname/${auth.currentUser.uid}`);
  return set(userRef, nickname)
    .then((s) => {
      return s;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getUserNickname = () => {
  const userRef = ref(db, `nickname/${auth.currentUser.uid}`);
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

export const removeUserNickname = () => {
  const userRef = ref(db, `nickname/${auth.currentUser.uid}`);
  return remove(userRef);
};

export const updateUserProgress = (progressUpdate) => {
  const userRef = ref(db, `progress/${auth.currentUser.uid}`);
  return update(userRef, progressUpdate);
};

export const removeUserProgress = () => {
  const userRef = ref(db, `progress/${auth.currentUser.uid}`);
  return remove(userRef);
};

export const getUserProgressByPlanet = (spaceObject) => {
  const progressRef = ref(
    db,
    `progress/${auth.currentUser.uid}/${spaceObject}`
  );
  return get(progressRef)
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
