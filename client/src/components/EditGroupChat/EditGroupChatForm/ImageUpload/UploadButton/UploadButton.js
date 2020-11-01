import React, { Component } from "react";

class UploadButton extends Component {
  onUploadButton = () => {
    this.uploadBtn.click();
  };

  render() {
    const { props } = this;
    return (
      <div>
        <div className="EditGroupChatForm__UploadButton">
          <div
            className="EditGroupChatForm__UploadButton__body"
            onClick={this.onUploadButton}
          >
            <i className="fas fa-upload UploadButton__icon" />
            <span className="EditGroupChatForm__UploadButton__text">
              Change Image
            </span>
          </div>
          <input
            type="file"
            id="single"
            name="upload"
            style={{ display: "none" }}
            onChange={props.onChange}
            ref={el => (this.uploadBtn = el)}
          />
        </div>
      </div>
    );
  }
}
export default UploadButton;
