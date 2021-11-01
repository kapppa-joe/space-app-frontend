import { db } from "./firebase";
import { ref, onValue, get, child } from "firebase/database";

// export const getObjectByName = async (objectName) => {
//   console.log("Test");
//   const planetRef = ref(db, 'planets', `/${objectName}`)
//   console.log(planetRef.toString())
//   let data;
//   onValue(planetRef, (snapshot) =>{
//     console.log('Getting snapshot')
//       data =  snapshot.val();
//   })
//   console.log(data)
//   return data[objectName];
// };

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
