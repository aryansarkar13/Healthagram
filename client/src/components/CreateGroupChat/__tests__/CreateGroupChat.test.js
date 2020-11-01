import React from "react";
import CreateGroupChat from "components/CreateGroupChat/CreateGroupChat";
import { shallow, render } from "enzyme";
import axios from "axios";
import moxios from "moxios";

describe("The Create Chat Group component", () => {
  beforeEach(function() {
    moxios.install(axios);
  });

  afterEach(function() {
    moxios.uninstall(axios);
  });
  it("should not regress", () => {
    const wrapper = render(<CreateGroupChat />);
    expect(wrapper).toMatchSnapshot();
  });

  it("should set group if valid input", () => {
    const value = "Samrat";
    const wrapper = shallow(<CreateGroupChat />);
    wrapper
      .find("input")
      .at(0)
      .simulate("change", {
        target: { value }
      });
    expect(wrapper.state("group")).toBe(value);
  });

  it("should set country if valid input", () => {
    const value = "Nepal";
    const wrapper = shallow(<CreateGroupChat />);
    wrapper
      .find("input")
      .at(1)
      .simulate("change", {
        target: { value }
      });
    expect(wrapper.state("country")).toBe(value);
  });

  it("should set error state when createChatGroup api returns error", async () => {
    const errorMsg = "Group already exist";
    moxios.stubRequest("/api/dashboard", {
      status: 400,
      response: {
        message: errorMsg
      }
    });
    const event = {
      preventDefault: () => {},
      target: {
        group: "",
        country: ""
      }
    };
    const wrapper = shallow(<CreateGroupChat />);
    await wrapper.instance().onFormSubmit(event);
    expect(wrapper.state("error")).toBe(errorMsg);
  });
});
