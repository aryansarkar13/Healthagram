import React from "react";

const ModalTrigger = ({ text, onOpen }) => {
  return (
    <p onClick={onOpen} className="c-modalBtn">
      {text || "Modal"}
    </p>
  );
};

export default ModalTrigger;
