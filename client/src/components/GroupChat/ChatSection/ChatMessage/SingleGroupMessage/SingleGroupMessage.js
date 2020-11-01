import React from "react";
import classnames from "classnames";

const SingleGroupMessage = props => {
  const messageClasses = classnames({
    SingleGroupMessage__body__message: true,
    "SingleGroupMessage__body__message--grey": !props.ownMessage,
    "SingleGroupMessage__body__message--blue": props.ownMessage
  });
  return (
    <li className="SingleGroupMessage">
      <span className="SingleGroupMessage__image-container">
        <img className="SingleGroupMessage__image" src={props.image} alt="" />
      </span>
      <div className="SingleGroupMessage__body">
        <span className="SingleGroupMessage__body__label-name">
          {props.name}
        </span>
        <br />
        <p className={messageClasses}>{props.message}</p>
      </div>
    </li>
  );
};
export default SingleGroupMessage;
