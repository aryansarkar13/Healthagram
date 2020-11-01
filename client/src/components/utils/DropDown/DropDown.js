import React, { Component } from "react";
import classnames from "classnames";
class DropDown extends Component {
  state = {
    displayMenu: false
  };

  showDropDownMenu = event => {
    event.preventDefault();
    this.setState(
      { displayMenu: true },
      document.addEventListener("mousedown", this.handleClickOutside)
    );
  };

  //if the click is outside the dropdown then it closed the dropdown
  handleClickOutside = event => {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.hideDropDownMenu();
    }
  };
  hideDropDownMenu = event => {
    this.setState({ displayMenu: false }, () => {
      document.removeEventListener("click", this.handleClickOutside);
    });
  };

  render() {
    const { props } = this;
    let dropdownRender = null;
    let dropdownClassNames = classnames({
      "DropDown__items-container": true,
      "DropDown__triangle-right DropDown__items-container--right":
        props.location === "right",
      "DropDown__triangle-middle DropDown__items-container--middle":
        props.location === "middle"
    });

    //Main items of drop down
    if (this.state.displayMenu) {
      dropdownRender = (
        <div className={dropdownClassNames}>{props.children}</div>
      );
    }

    return (
      <div className="DropDown" ref={el => (this.wrapperRef = el)}>
        <div
          onClick={this.showDropDownMenu}
          className="DropDown__button-container"
        >
          <div className="DropDown__button-container__text">
            {props.displayText} {"  "}
          </div>
        </div>
        {dropdownRender}
      </div>
    );
  }
}

export default DropDown;
