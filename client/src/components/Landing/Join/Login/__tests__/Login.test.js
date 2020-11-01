import { Login } from "components/Landing/Join/Login/Login";
import { shallow } from "enzyme";
import React from "react";
import { loginFormSubmit } from "store/actions/profile/profile";

jest.mock("store/actions/profile/profile", () => ({
  loginFormSubmit: jest.fn()
}));

describe("The Login component description", () => {
  describe("The Login component", () => {
    const props = {
      handleSubmit: jest.fn(),
      values: { name: "Samrat" },
      history: jest.fn()
    };

    it("should call handleSubmit and loginFormSubmit on form submission", () => {
      const wrapper = shallow(<Login {...props} />);
      wrapper.find("button").simulate("click");
      expect(props.handleSubmit).toHaveBeenCalledWith(expect.any(Function));
      expect(loginFormSubmit).not.toHaveBeenCalled();
      props.handleSubmit.mock.calls[0][0](props.values);
      expect(loginFormSubmit).toHaveBeenCalledWith(
        { name: "Samrat" },
        expect.any(Function),
        expect.any(Function)
      );
    });
  });
});
