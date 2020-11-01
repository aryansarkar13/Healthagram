import { Filter } from "components/Home/Filter/Filter";
import React from "react";
import { shallow } from "enzyme";

describe("The Filter component", () => {
  it("should not regress", () => {
    const countries = [
      {
        _id: "Nepal"
      },
      {
        _id: "Singapore"
      }
    ];
    const wrapper = shallow(<Filter countries={countries} />);
    expect(wrapper).toMatchSnapshot();
  });
});
