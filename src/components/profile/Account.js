import React, { Component } from "react";
import { connect } from "react-redux";
import Username from "./Username";
import Email from "./Email";
import Password from "./Password";

class Account extends Component {
  state = {
    activeItem: "username",
  };

  componentDidMount = () => {
    this.setState({ activeItem: this.props.activeItem });
  };

  componentDidUpdate = (prevProps) => {
    if (this.props.activeItem !== prevProps.activeItem) {
      this.setState({ activeItem: this.props.activeItem });
    }
  };

  render() {
    const { activeItem } = this.state;

    let currentComponent;

    if (activeItem === "username") {
      currentComponent = <Username />;
    } else if (activeItem === "email") {
      currentComponent = <Email />;
    } else {
      currentComponent = <Password />;
    }

    return <div>{currentComponent}</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    isAuth: state.auth.isAuth,
  };
};

export default connect(mapStateToProps)(Account);
