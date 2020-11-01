import React from "react";

const AuthorArea = props => {
  return (
    <div className="ProfileSection__top-header-author">
      <div className="ProfileSection__author-thumb">
        <img
          className="ProfileSection__author-image"
          src={props.friendImage}
          alt=""
        />
      </div>
      <div className="ProfileSection__author-content">
        <h4 className="ProfileSection__author-name">{props.friendName}</h4>
        <div className="ProfileSection__author-country">{props.country}</div>
      </div>
    </div>
  );
};

export default AuthorArea;
