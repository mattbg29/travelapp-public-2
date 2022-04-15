//Thank you codingleft.com for presenting a very useful template that I was able to leverage for this!
//https://www.codingdeft.com/posts/react-authentication-mern-node-passport-express-mongo/

import { Button, Callout, FormGroup, InputGroup } from "@blueprintjs/core";
import React, { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";

const SafetyNewData = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [ranking, setRanking] = useState("");
  const [userContext, setUserContext] = useContext(UserContext);
  const bearer = 'Bearer ' + userContext.token;


  const formSubmitHandler = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    const genericErrorMessage = "Something went wrong! Please try again later.";

    fetch(process.env.REACT_APP_API_ENDPOINT + "safety/addData", {
      method: "POST",
      credentials: "same-origin",
      headers: { 
          "Content-Type": "application/json", 
          "Authorization": bearer
        },
      body: JSON.stringify({ name: name, ranking: ranking }),
    })
      .then(async (response) => {
        setIsSubmitting(false);
        if (!response.ok) {
          if (response.status === 400) {
            setError("Please fill all the fields correctly!");
          } else if (response.status === 401) {
            setError("Invalid email and password combination.");
          } else {
            setError(genericErrorMessage);
          }
        } 
      })
      .catch((error) => {
        setIsSubmitting(false);
        setError(genericErrorMessage);
      });
  };
  return userContext.token !== null ? (
    <>
      {error && <Callout intent="danger">{error}</Callout>}
      <div style={{textAlign: 'center'}}>
      <form onSubmit={formSubmitHandler} className="auth-form">
        <FormGroup label="Add Custom Data" labelFor="name">
          <InputGroup
            id="name"
            placeholder="Country name"
            type="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <InputGroup
            id="ranking"
            placeholder="Ranking"
            type="ranking"
            value={ranking}
            onChange={(e) => setRanking(e.target.value)}
          />
        </FormGroup>
        <Button
          intent="primary"
          disabled={isSubmitting}
          text={`${isSubmitting ? "Submitting" : "Submit"}`}
          fill
          type="submit"
        />
      </form>
      </div>
    </>
  ) : '';
};

export default SafetyNewData;
