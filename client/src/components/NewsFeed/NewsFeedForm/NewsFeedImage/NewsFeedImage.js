import React, { Component } from "react";

class NewsFeedImage extends Component {
  render() {
    //Currently we accept only one image
    //Add multiple images if you want
    const { files } = this.props;
    if (files.length === 0) return "";
    let divBackgroundStyle = {
      backgroundImage: `url(${files[0].preview})`
    };
    return (
      <div className="NewsFeedImage">
        <div className="NewsFeedImage__image" style={divBackgroundStyle} />
      </div>
    );
  }
}
export default NewsFeedImage;
