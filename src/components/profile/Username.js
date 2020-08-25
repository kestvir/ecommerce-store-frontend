import React, { Component } from "react";
import { authAxios } from "../../utils";
import { connect } from "react-redux";
import { userAccountInfo, userUsernameChange } from "../../constants";
import { Form, Button, Message } from "semantic-ui-react";

class Username extends Component {
  state = {
    username: "",
    password: "",
    loading: null,
    success: null,
    errors: null,
  };

  componentDidMount = () => {
    this.fetchAccountInfo();
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  fetchAccountInfo = () => {
    this.setState({ loading: true });
    authAxios(this.props.token)
      .get(userAccountInfo)
      .then((res) => {
        this.setState({
          loading: false,
          errors: false,
          username: res.data.username,
        });
      })
      .catch((err) => {
        this.setState({ errors: err, loading: false });
      });
  };

  changeUsername = () => {
    this.setState({ loading: true });
    const { username, password } = this.state;
    console.log(username);
    authAxios(this.props.token)
      .post(userUsernameChange, { new_username: username, password })
      .then((res) => {
        this.setState({
          password: "",
          success: "Username change successful!",
          loading: false,
          errors: false,
        });
        this.fetchAccountInfo();
      })
      .catch((err) => {
        this.setState({
          errors: err,
          success: false,
          loading: false,
        });
      });
  };

  changeEmail = () => {
    this.setState({ loading: true });
    const { email } = this.state;
    authAxios(this.props.token)
      .put(userAccountInfo, { email })
      .then((res) => {
        this.fetchAccountInfo();
        this.setState({ success: "Email changed successfully!" });
      })
      .catch((err) => {
        this.setState({ error: err, loading: false, success: null });
      });
  };

  render() {
    const { username, errors, loading, password, success } = this.state;
    return (
      <div>
        <Form onSubmit={this.changeUsername}>
          <Form.Field>
            <label>Username</label>
            <input
              onChange={this.handleChange}
              value={username}
              name="username"
            />
          </Form.Field>
          <Form.Field>
            <label>Password</label>
            <input
              onChange={this.handleChange}
              value={password}
              type="password"
              name="password"
            />
          </Form.Field>
          <Button type="submit" disabled={loading} loading={loading} primary>
            Save
          </Button>
        </Form>
        {errors && (
          <Message
            error
            header="There was some errors with your submission"
            content={JSON.stringify(errors)}
          />
        )}
        {success && <Message success header="Success!" content={success} />}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    isAuth: state.auth.isAuth,
  };
};

export default connect(mapStateToProps)(Username);
