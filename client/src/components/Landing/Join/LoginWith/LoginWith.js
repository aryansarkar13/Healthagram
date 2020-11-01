import React, { Component } from "react";

class LoginWith extends Component {
  render() {
    return (
      <div className="LoginWith">
        <span className="LoginWith__label">Or Login With:</span>
        <a className="LoginWith__link" href="/api/auth/facebook">
          <i class="fab fa-facebook-f" />
        </a>
        <a className="LoginWith__link" href="/api/auth/google">
          <i class="fab fa-google" />
        </a>
      </div>
    );
  }
}
export default LoginWith;
