import React, { Component } from "react";
import Register from "components/Landing/Join/Register/Register";
import Login from "components/Landing/Join/Login/Login";
import classnames from "classnames";

class Join extends Component {
  state = {
    mode: "login"
  };

  renderForm = () => {
    if (this.state.mode === "register") {
      return <Register />;
    } else {
      return <Login />;
    }
  };

  changeMode = mode => {
    this.setState({ mode });
  };
  render() {
    const registerbtnClasses = classnames({
      Join__tabs__tab: true,
      "Join__tabs__tab--unselected": this.state.mode !== "register"
    });

    const loginbtnClasses = classnames({
      Join__tabs__tab: true,
      "Join__tabs__tab--unselected": this.state.mode !== "login"
    });
    return (
      <div className="Join">
        <ul className="Join__tabs">
          <li
            className={registerbtnClasses}
            onClick={() => this.changeMode("register")}
          >
            Register Now
          </li>
          <li
            className={loginbtnClasses}
            onClick={() => this.changeMode("login")}
          >
            Login
          </li>
        </ul>
        <div className="Join__content">{this.renderForm()}</div>
      </div>
    );
  }
}
export default Join;
