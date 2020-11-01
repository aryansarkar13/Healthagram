import React from "react";
import groupBottom from "assets/images/image2.jpg";

const ManageGroups = () => {
  return (
    <div className="ManageGroups">
      <div className="ManageGroups__background" />
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="ManageGroups__header-content">
              <h1 className="ManageGroups__header-content__title">
                Manage Your Events
              </h1>
              <p className="ManageGroups__header-content__description">
                Join hands togerther for a better world, one drop at a time.
              </p>
            </div>
          </div>
        </div>
      </div>
      <img className="ManageGroups__image" src={groupBottom} c alt="" />
    </div>
  );
};

export default ManageGroups;
