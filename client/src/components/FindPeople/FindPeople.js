import React, { Component } from "react";
import { css } from "react-emotion";
import { ClipLoader } from "react-spinners";
import ApplicationHeader from "components/utils/ApplicationHeader/ApplicationHeader";
import ApplicationSideNav from "components/utils/ApplicationSideNav/ApplicationSideNav";
import LeftMenu from "components/utils/LeftMenu/LeftMenu";
import OnlineOfflineFriends from "components/utils/Chat/OnlineOfflineFriends/OnlineOfflineFriends";
import PeopleItem from "components/FindPeople/PeopleItem/PeopleItem";
import axios from "axios";
import { updatePageName } from "store/actions/page/page";
import { connect } from "react-redux";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

class FindPeople extends Component {
  state = {
    loading: true,
    fetched: false,
    peoples: [],
    error: ""
  };

  componentDidMount = async () => {
    this.props.updatePageName("Find Friends");
    try {
      const searchText = this.props.match.params.searchText;
      const res = await axios.get(`/api/findpeople/${searchText}`);
      console.log("From find people", res.data);
      this.setState({ peoples: res.data, loading: false, fetched: true });
    } catch (err) {
      console.log(err);
      this.setState({
        error: "Oops some error occured please try again later"
      });
    }
  };

  renderPeopleItems = () => {
    console.log("Render People Items have benn called", this.state.peoples);
    if (this.state.peoples.length > 0) {
      return this.state.peoples.map(people => (
        <div className="col-md-3 col-sm-6">
          {" "}
          <PeopleItem
            name={people.fullname}
            image={people.userImage}
            id={people._id}
            friends={people.friendsList.length}
          />{" "}
        </div>
      ));
    } else {
      if (!this.state.loading && this.state.fetched) {
        return (
          <p className="FindPeople__no-friend-message">
            Your search did not match any results
          </p>
        );
      }
      return null;
    }
  };

  render() {
    let spinner = (
      <div className="FindPeople--spinner">
        <ClipLoader
          className={override}
          sizeUnit={"px"}
          size={50}
          color={"#123abc"}
          loading={this.state.uploading}
        />
      </div>
    );

    return (
      <div className="FindPeople">
        <ApplicationSideNav />
        <LeftMenu />
        <ApplicationHeader />
        <OnlineOfflineFriends />
        {this.state.loading && spinner}
        <div className="container FindPeople__contents">
          <div className="row FindPeople__row">{this.renderPeopleItems()}</div>
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  { updatePageName }
)(FindPeople);
