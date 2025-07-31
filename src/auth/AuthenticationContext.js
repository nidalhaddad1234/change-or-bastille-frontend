import React from "react";

const AuthenticationContext = React.createContext({
  claims: [],
  update: (claims) => {},
});

export default AuthenticationContext;
