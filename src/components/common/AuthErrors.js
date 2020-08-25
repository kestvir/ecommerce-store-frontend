import React from "react";
import uuid from "react-uuid";
import { handleAuthErrs } from "../../utils";

const AuthErrors = ({ error }) => {
  console.log(error);
  return (
    <div>
      {handleAuthErrs(error).map((err) => {
        return (
          <p className="auth-error" key={uuid()}>
            {err}
          </p>
        );
      })}
    </div>
  );
};

export default AuthErrors;
