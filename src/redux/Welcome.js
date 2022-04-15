//Thank you codingleft.com for presenting a very useful template that I was able to leverage for this!
//https://www.codingdeft.com/posts/react-authentication-mern-node-passport-express-mongo/

import { Button, Card } from "@blueprintjs/core";
import React, { useCallback, useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import Loader from "../components/Loader";

const Welcome = (props) => {
  const [userContext, setUserContext] = useContext(UserContext);

  const fetchUserDetails = useCallback(() => {
    fetch(process.env.REACT_APP_API_ENDPOINT + "users/me", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userContext.token}`,
      },
    }).then(async (response) => {
      if (response.ok) {
        const data = await response.json();
        setUserContext((oldValues) => {
          return { ...oldValues, details: data };
        });
      } else {
        if (response.status === 401) {
          window.location.reload();
        } else {
          setUserContext((oldValues) => {
            return { ...oldValues, details: null };
          });
        }
      }
    });
  }, [setUserContext, userContext.token]);

  useEffect(() => {
    if (!userContext.details) {
      fetchUserDetails();
    }
  }, [userContext.details, fetchUserDetails]);

  const logoutHandler = () => {
    fetch(process.env.REACT_APP_API_ENDPOINT + "users/logout", {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userContext.token}`,
      },
    }).then(async (response) => {
      setUserContext((oldValues) => {
        return { ...oldValues, details: undefined, token: null };
      });
      window.localStorage.setItem("logout", Date.now());
    });
    return props.handleCallback(0)
  };

  return userContext.details === null ? (
    "Error Loading User details"
  ) : !userContext.details ? (
    <Loader />
  ) : (
    <Card elevation="1">
      <div className="user-details" style={{display: 'flex'}}>
        <div>
          <p>
            Welcome&nbsp;
            <strong>
              {userContext.details.firstName}
              {userContext.details.lastName &&
                " " + userContext.details.lastName}
            </strong>
            !
          </p>
        </div>
        <div className="user-actions" style={{marginLeft: 20}}>
          <Button
            text="Logout"
            onClick={logoutHandler}
            intent="primary"
          />
        </div>
      </div>
    </Card>
  );
};

export default Welcome;

