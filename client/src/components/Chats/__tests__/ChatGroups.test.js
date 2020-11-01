import { ChatGroups } from "components/Home/ChatGroups/ChatGroups";
import React from "react";
import { shallow } from "enzyme";
describe("The ChatGroups component", () => {
  it("should not regress", () => {
    const groups = [
      {
        name: "Samrat",
        country: "Nepal",
        image: "randomstring"
      }
    ];
    const wrapper = shallow(<ChatGroups groups={groups} />);
    expect(wrapper).toMatchSnapshot();
  });
});
