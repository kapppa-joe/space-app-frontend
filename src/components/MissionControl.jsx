import React from "react";
import { useEffect, useState } from "react";
import { getUserProgress, setUserProgress, updateUserProgress } from "../db";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";

const MissionControl = () => {
  const [user, loading, error] = useAuthState(auth);

  const [progress, setProgress] = useState(null);

  useEffect(()=>{
    if(user){
      getUserProgress().then(dbProgress =>{
        setProgress(dbProgress)
      })
    }
  },[user,progress])

  const testDB = () => {
    updateUserProgress({ sun: [1,2,3,4,5] });
  };

  if (loading) {
    return <div>Initialising User...</div>;
  }

  if (error) {
    return (
      <div>
        <p>Error: {error}</p>
      </div>
    );
  }

  if (user) {
    return (
      <div>
        <button onClick={testDB}>DB test</button>
        <p>Sun {progress ? progress.sun.length : 0}/10</p>
      </div>
    );
  }
};

export default MissionControl;
