import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class PeopleItem extends Component {
  onClickViewProfile = () => {
    const id = this.props.id;
    this.props.history.push(`/profilepage/${id}`);
  };
  render() {
    const { props } = this;
    console.log("From People Item", props.id);
    console.log(props);
    return (
      <div className="PeopleItem">
        <div className="PeopleItem__content">
          <div className="PeopleItem__avatar">
            <div className="PeopleItem__author-thumb">
              <img
                src={props.image}
                className="PeopleItem__author-image"
                alt=""
              />
            </div>
            <div className="PeopleItem__author-content">
              <p className="PeopleItem__author-name">{props.name}</p>
              <p className="PeopleItem__author-country"> {props.country} </p>
            </div>
          </div>
          <div className="PeopleItem__info-container">
            <div className="PeopleItem__info">
              <h6 className="PeopleItem__info__content">{props.friends}</h6>
              <div className="PeopleItem__info__title">Friends</div>
            </div>
            <div className="PeopleItem__info">
              <h6 className="PeopleItem__info__content">0</h6>
              <div className="PeopleItem__info__title">Photos</div>
            </div>
            <div className="PeopleItem__info">
              <h6 className="PeopleItem__info__content">0</h6>
              <div className="PeopleItem__info__title">Videos</div>
            </div>
          </div>
          <div
            onClick={this.onClickViewProfile}
            className="PeopleItem__control"
          >
            View The Profile
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(PeopleItem);
