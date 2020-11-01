import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import formFields from "components/Landing/Join/Login/formFields";
import LoginField from "components/Landing/Join/Login/LoginField/LoginField";
import _ from "lodash";
import { loginFormSubmit } from "store/actions/profile/profile";
import { SubmissionError } from "redux-form";
import { withRouter } from "react-router-dom";
import LoginWith from "components/Landing/Join/LoginWith/LoginWith";

export class Login extends Component {
  renderFields() {
    return _.map(formFields, ({ label, name }) => {
      return (
        <Field
          component={LoginField}
          type="text"
          key={label}
          label={label}
          name={name}
        />
      );
    });
  }

  render() {
    const { handleSubmit, history, dispatch } = this.props;
    return (
      <div className="Login">
        <form
          className="Login__form"
          onSubmit={handleSubmit(values =>
            loginFormSubmit(values, history, dispatch, SubmissionError)
          )}
        >
          {this.renderFields()}
          <button className="Login__form__submit-btn" type="submit">
            Login
          </button>
          <div className="Login__LoginWith__container">
            <LoginWith />
          </div>
        </form>
      </div>
    );
  }
}
export default withRouter(
  connect(
    null,
    { loginFormSubmit }
  )(
    reduxForm({
      form: "loginform"
    })(Login)
  )
);
