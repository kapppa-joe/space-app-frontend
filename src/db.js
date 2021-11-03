import { auth, db } from "./firebase";
import { ref, set, get, remove, child, update } from "firebase/database";

let userId;

export const setDefaults = () => {
  setUserAvatar(0);

  setUserNickname("");
  setUserProgress("");
};

export const getTrivia = (objectName) => {
  const planetRef = ref(db, `planets/${objectName}`);
  return get(child(planetRef, "trivia")).then((snapshot) => {
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      throw "planet does not exist";
    }
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
        throw "planet does not exist";
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

export const setUserProgress = async (progress) => {
  const userRef = ref(db, `progress/${await auth.currentUser.uid}`);
  return set(userRef, { planet: [1] });
};

export const getUserProgress = async () => {
  const userRef = ref(db, `progress/${await auth.currentUser.uid}`);
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

export const setUserAvatar = async (avatar) => {
  const userRef = ref(db, `avatar/${await auth.currentUser.uid}`);
  return set(userRef, avatar);
};

export const getUserAvatar = async () => {
  const userRef = ref(db, `avatar/${await auth.currentUser.uid}`);
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

export const setUserNickname = async (nickname) => {
  const userRef = ref(db, `nickname/${await auth.currentUser.uid}`);
  return set(userRef, nickname)
    .then((s) => {
      return s;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getUserNickname = async () => {
  const userRef = ref(db, `nickname/${await auth.currentUser.uid}`);
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

export const removeUserNickname = async () => {
  const userRef = ref(db, `nickname/${await auth.currentUser.uid}`);
  return remove(userRef);
};

export const updateUserProgress = async (progressUpdate) => {
  const userRef = ref(db, `progress/${await auth.currentUser.uid}`);
  return update(userRef, progressUpdate);
};

export const removeUserProgress = () => {
  setUserProgress();
};

export const getUserProgressByPlanet = async (spaceObject) => {
  const progressRef = ref(
    db,
    `progress/${await auth.currentUser.uid}/${spaceObject}`
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
