import React, { Component } from "react";

class UploadButton extends Component {
  onUploadButton = () => {
    this.uploadBtn.click();
  };

  render() {
    const { props } = this;
    return (
      <div>
        <div className="UploadButton">
          <div className="UploadButton__body" onClick={this.onUploadButton}>
            <i className="fas fa-upload UploadButton__icon" />
            <span className="UploadButton__text">Upload Image</span>
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
