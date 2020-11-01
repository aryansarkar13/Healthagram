import React, { Component } from "react";
import ImageUpload from "components/CreateGroupChat/GroupChatForm/ImageUpload/ImageUpload";
class GroupChatForm extends Component {
  onGroupNameChange = e => {
    this.props.groupNameChange(e.target.value);
  };

  onCountryChange = e => {
    this.props.countryChange(e.target.value);
  };

  onFileNameChange = name => {
    this.setState({ fileName: name });
  };
  render() {
    return (
      <div className="GroupChatForm__body">
        <div className="GroupChatForm__ui-block">
          <h6 className="GroupChatForm__ui-block__title">
            Create A Chat Group
          </h6>
        </div>
        <div className="GroupChatForm__content">
          <div className="GroupChatForm__form-group">
            <label className="GroupChatForm__form-group__label">
              Group Name
            </label>
            <input
              type="text"
              className="GroupChatForm__form-group__input"
              name="group"
              value={this.props.groupname}
              onChange={this.onGroupNameChange}
            />
            {this.props.groupnameError && (
              <p className="GroupChatForm__error-message">
                {this.props.groupnameError}
              </p>
            )}
          </div>

          <div className="GroupChatForm__form-group">
            <label className="GroupChatForm__form-group__label">Country</label>
            <input
              type="text"
              className="GroupChatForm__form-group__input"
              name="group"
              value={this.props.country}
              onChange={this.onCountryChange}
            />
            {this.props.countryError && (
              <p className="GroupChatForm__error-message">
                {this.props.countryError}
              </p>
            )}
          </div>
        </div>

        <ImageUpload
          groupImageError={this.props.groupImageError}
          groupImageChange={this.props.groupImageChange}
        />
        <div className="GroupChatForm__create-btn-container">
          <div
            className="GroupChatForm__create-btn-container__button"
            onClick={this.props.createChatGroup}
          >
            Create Group
          </div>
        </div>
      </div>
    );
  }
}
export default GroupChatForm;
