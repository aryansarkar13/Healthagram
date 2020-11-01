import React from "react";
import classnames from "classnames";

const SingleGroupMessage = props => {
  const messageClasses = classnames({
    PrivateChat__SingleGroupMessage__body__message: true,
    "PrivateChat__SingleGroupMessage__body__message--grey": !props.ownMessage,
    "PrivateChat__SingleGroupMessage__body__message--blue": props.ownMessage
  });

  return (
    <li className="PrivateChat__SingleGroupMessage">
      <span className="PrivateChat__SingleGroupMessage__image-container">
        <img
          className="PrivateChat__SingleGroupMessage__image"
          src={props.image}
          alt=""
        />
      </span>
      <div className="PrivateChat__SingleGroupMessage__body">
        <span className="PrivateChat__SingleGroupMessage__body__label-name">
          {props.name}
        </span>
        <br />
        <p className={messageClasses}> {props.message} </p>
      </div>
    </li>
  );
};
export default SingleGroupMessage;
