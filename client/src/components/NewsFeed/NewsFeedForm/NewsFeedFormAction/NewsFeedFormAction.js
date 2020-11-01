import React, { Component } from "react";
import Icon from "components/utils/Icon/Icon";
import ReactTooltip from "react-tooltip";
import Dropzone from "react-dropzone";
import classNames from "classnames";

class NewsFeedFormAction extends Component {
  render() {
    return (
      <div className="NewsFeedFormAction">
        <ReactTooltip effect="solid" place="top" />
        {/*It is hidden */}
        <div className="NewsFeedFormAction__dropzone">
          <Dropzone onDrop={this.props.onDrop}>
            {({ getRootProps, getInputProps, isDragActive }) => {
              return (
                <div
                  {...getRootProps()}
                  className={classNames("dropzone", {
                    "dropzone--isActive": isDragActive
                  })}
                >
                  <input {...getInputProps()} />
                  <div
                    className="NewsFeedFormAction__image-upload-btn"
                    data-tip="Add Photo"
                  >
                    <Icon name="camera-icon" color="#c2c5d9" size={24} />
                  </div>
                </div>
              );
            }}
          </Dropzone>
        </div>

        <button
          className={classNames({
            "NewsFeedFormAction__post-btn": true,
            "NewsFeedFormAction__post-btn--disabled": this.props.postDisabled
          })}
          onClick={this.props.postStatus}
          disabled={this.props.postDisabled}
        >
          Post Status
        </button>
      </div>
    );
  }
}
export default NewsFeedFormAction;
