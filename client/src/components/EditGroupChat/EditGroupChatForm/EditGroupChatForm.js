import React, { Component } from "react";
import ImageUpload from "components/EditGroupChat/EditGroupChatForm/ImageUpload/ImageUpload";

class EditGroupChatForm extends Component {
  onCountryChange = e => {
    this.props.countryChange(e.target.value);
  };

  onFileNameChange = name => {
    this.setState({ fileName: name });
  };

  render() {
    return (
      <div className="EditGroupChatForm__body">
        <div className="EditGroupChatForm__ui-block">
          <h6 className="EditGroupChatForm__ui-block__title">
            Edit A Chat Group
          </h6>
        </div>
        <div className="EditGroupChatForm__content">
          <div className="EditGroupChatForm__form-group">
            {/*Error related to saving a form */}
            {this.props.error && (
              <p className="EditGroupChatForm__error-message">
                {this.props.error}
              </p>
            )}
            <label className="EditGroupChatForm__form-group__label">
              Group Name
            </label>
            <input
              type="text"
              className="EditGroupChatForm__form-group__input"
              name="group"
              value={this.props.groupname}
              disabled={true}
            />
          </div>
          {this.props.groupnameError && (
            <p className="EditGroupChatForm__error-message">
              {this.props.groupnameError}
            </p>
          )}
          <div className="EditGroupChatForm__form-group">
            <label className="EditGroupChatForm__form-group__label">
              Country
            </label>
            <input
              type="text"
              className="EditGroupChatForm__form-group__input"
              name="group"
              value={this.props.country}
              onChange={this.onCountryChange}
            />
            {this.props.countryError && (
              <p className="EditGroupChatForm__error-message">
                {this.props.countryError}
              </p>
            )}
          </div>
        </div>

        <ImageUpload groupImageChange={this.props.groupImageChange} />
        <div className="EditGroupChatForm__edit-btn-container">
          <div
            className="EditGroupChatForm__edit-btn-container__button"
            onClick={this.props.editChatGroup}
          >
            Save Changes
          </div>
          <div
            className="EditGroupChatForm__edit-btn-container__button EditGroupChatForm__edit-btn-container__button--danger"
            onClick={this.props.deleteChatGroup}
          >
            Delete Chat Group
          </div>
        </div>
      </div>
    );
  }
}
export default EditGroupChatForm;
