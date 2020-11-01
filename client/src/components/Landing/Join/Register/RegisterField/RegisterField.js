import React, { Component } from "react";

const RegisterField = ({ input, label, meta: { error, touched } }) => {
  return (
    <div>
      <input
        className="RegisterField"
        placeholder={label}
        {...input}
        style={{ marginBottom: "5px" }}
      />
      <div className="RegisterField__red-text" style={{ marginBottom: "20px" }}>
        {touched && error}
      </div>
    </div>
  );
};

export default RegisterField;
