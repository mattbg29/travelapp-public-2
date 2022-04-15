import React, { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";

var dataLoaded = 'false'
const {SAFETY} = require('../data/safetyIndex.js');

const Action4 = (props) => {
  const [error, setError] = useState("");
  const [userContext] = useContext(UserContext);
  const cloneData = []
  let elementNew = {}
  var onOff = 'off'
  if(userContext.token) {
    onOff = 'on'
  }

  const formSubmitHandler = () => {
    const genericErrorMessage = "Something went wrong! Please try again later.";
    fetch(process.env.REACT_APP_API_ENDPOINT + "safety", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userContext.token}`,
      },
    })
      .then(async (response) => {
        if (!response.ok) {
          if (response.status === 400) {
            setError("Please fill all the fields correctly!");
          } else if (response.status === 401) {
            setError("Invalid email and password combination.");
          } else {
            setError(genericErrorMessage);
          }
        } else {
          const data = await response.json();
          for (var i = 0; i < data.length; i++) {
            elementNew = {}
            elementNew.name = data[i].name
            elementNew.ranking = data[i].ranking
            cloneData.push(elementNew)
          }
          dataLoaded = 'true'
          return props.handleCallback(cloneData)
        }
      })
      .catch((error) => {
        setError(genericErrorMessage);
      });
  }

  const formSubmitHandler2 = () => {
    return props.handleCallback(SAFETY)
  }

  return (
    <div style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
      {onOff === 'on' && <button style={{width: 150, marginRight: 50}} onClick={formSubmitHandler} className="auth-form1">Load User Data</button>}
      {onOff === 'on' && dataLoaded === 'true' && <button style={{width: 150, marginRight: 50}} onClick={formSubmitHandler2} className="auth-form1">Load Original Data</button>}
    </div>
  );
};

export default Action4;
