import React from "react";

const PersonalInfo = props => {
  return (
    <div className="PersonalInfo">
      <div className="PersonalInfo__block-title-container">
        <h6 className="PersonalInfo__block-title">Personal Info</h6>
      </div>
      <div className="PersonalInfo__content">
        <ul className="PersonalInfo__content-list">
          <li className="PersonalInfo__single-content">
            <span className="PersonalInfo__single-content__title">
              About Me:
            </span>
            <span className="PersonalInfo__single-content__text">
              {props.description ||
                "This user prefers to keep the mystery in the air"}
            </span>
          </li>
          <li className="PersonalInfo__single-content">
            <span className="PersonalInfo__single-content__title">
              Full Name
            </span>
            <span className="PersonalInfo__single-content__text">
              {props.fullname}
            </span>
          </li>
          <li className="PersonalInfo__single-content">
            <span className="PersonalInfo__single-content__title">
              User Name
            </span>
            <span className="PersonalInfo__single-content__text">
              {props.username}
            </span>
          </li>
          <li className="PersonalInfo__single-content">
            <span className="PersonalInfo__single-content__title">Gender</span>
            <span className="PersonalInfo__single-content__text">
              {props.gender || "No information given"}
            </span>
          </li>
          <li className="PersonalInfo__single-content">
            <span className="PersonalInfo__single-content__title">Blood Group</span>
            <span className="PersonalInfo__single-content__text">
              {props.blood_group || "No information given"}
            </span>
          </li>
          <li className="PersonalInfo__single-content">
            <span className="PersonalInfo__single-content__title">Latitude</span>
            <span className="PersonalInfo__single-content__text">
              {props.latitude || "No information given"}
            </span>
          </li>
          <li className="PersonalInfo__single-content">
            <span className="PersonalInfo__single-content__title">Longitude</span>
            <span className="PersonalInfo__single-content__text">
              {props.longitude || "No information given"}
            </span>
          </li>
          <li className="PersonalInfo__single-content">
            <span className="PersonalInfo__single-content__title">Locality</span>
            <span className="PersonalInfo__single-content__text">
              {props.locality || "No information given"}
            </span>
          </li>
          <li className="PersonalInfo__single-content">
            <span className="PersonalInfo__single-content__title">City/Country</span>
            <span className="PersonalInfo__single-content__text">
              {props.country || "No information given"}
            </span>
          </li>
          <li className="PersonalInfo__single-content">
            <span className="PersonalInfo__single-content__title">Email</span>
            <span className="PersonalInfo__single-content__text">
              {props.email}
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default PersonalInfo;
