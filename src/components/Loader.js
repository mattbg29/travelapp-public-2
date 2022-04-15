//Thank you codingleft.com for presenting the following code!
//https://www.codingdeft.com/posts/react-authentication-mern-node-passport-express-mongo/

import { Spinner } from "@blueprintjs/core";
import React from "react";

const Loader = () => {
  return (
    <div className="loader">
      <Spinner size={50} />
    </div>
  );
};

export default Loader;
