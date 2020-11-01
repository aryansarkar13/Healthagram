import React, { Component } from "react";
import { connect } from "react-redux";
import { updateGroupFilterCountry } from "store/actions/group/group";
import Select from "react-select";

export class Filter extends Component {
  state = {
    //This is used for changing the value of select
    selectedOption: null
  };

  renderOptions = () => {
    const defaultOption = { value: "", label: "Filter By Country" };

    let options = [];
    const filterCountry = this.props.filterCountry;
    if (this.props.countries) {
      options.push(defaultOption);
      this.props.countries.map((country, index) => {
        //country._id is the name of the country
        //sorry for the confusing name
        options.push({
          value: country._id,
          label: country._id
        });
      });
    }
    return (
      <Select
        options={options}
        value={
          this.state.selectedOption === null
            ? defaultOption
            : this.state.selectedOption
        }
        onChange={this.onSelectChange}
      />
    );
  };

  onSelectChange = selectedOption => {
    console.log("select change is called", selectedOption.value);
    this.setState({ selectedOption });
    this.props.updateGroupFilterCountry(selectedOption.value);
  };

  render() {
    return <div className="Filter">{this.renderOptions()}</div>;
  }
}

const mapStateToProps = state => ({
  countries: state.group.countries,
  filterCountry: state.group.filter.country
});

export default connect(
  mapStateToProps,
  { updateGroupFilterCountry }
)(Filter);
