//Thank you codingleft.com for presenting a very useful template that I was able to leverage for this!
//https://www.codingdeft.com/posts/react-authentication-mern-node-passport-express-mongo/

import React, { useState } from "react";

const UserContext = React.createContext([{}, () => {}]);

let initialState = {};

const UserProvider = (props) => {
  const [state, setState] = useState(initialState);

  return (
    <UserContext.Provider value={[state, setState]}>
      {props.children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
