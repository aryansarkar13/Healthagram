import React from "react";
import ImageUpload from "components/CreateChatGroup/ImageUpload/ImageUpload";
import { shallow } from "enzyme";
import axios from "axios";
import moxios from "moxios";

describe("The Image Upload Component", () => {
  beforeEach(function() {
    // import and pass your custom axios instance to this method
    moxios.install(axios);
  });

  afterEach(function() {
    // import and pass your custom axios instance to this method
    moxios.uninstall(axios);
  });

  it("should set uploading to true on file input change", () => {
    const wrapper = shallow(<ImageUpload />);
    wrapper.setState({ uploading: false });
    wrapper.instance().sendFormData = jest.fn();
    wrapper.update();
    wrapper.find("UploadButton").simulate("change", {
      target: {
        files: ["djklfdjaslkjlk"]
      }
    });
    expect(wrapper.state("uploading")).toBe(true);
  });

  it("should check sendFormdata is called with formData on file change", () => {
    const fileValue = "dummydata";
    const formData = new FormData();
    formData.append("image", fileValue);
    const wrapper = shallow(<ImageUpload />);
    wrapper.instance().sendFormData = jest.fn();
    wrapper.update();
    wrapper.find("UploadButton").simulate("change", {
      target: {
        files: [fileValue]
      }
    });
    expect(wrapper.instance().sendFormData).toHaveBeenCalledWith(formData);
  });

  it("should set uploading back to false on file successful upload", async () => {
    const data = "dummydata";
    moxios.stubRequest("/api/image-upload", {
      status: 200,
      response: data
    });
    const props = {
      onFileNameChange: jest.fn()
    };
    const wrapper = shallow(<ImageUpload {...props} />);
    wrapper.setState({ uploading: true });
    await wrapper.instance().sendFormData("dummydata");
    expect(props.onFileNameChange).toHaveBeenCalledWith(data);
    expect(wrapper.state("uploading")).toBe(false);
  });
});
