import React, { Component } from "react";
import { authAxios } from "../../utils";
import { connect } from "react-redux";
import { userAccountInfo } from "../../constants";
import { Form, Button, Message } from "semantic-ui-react";

class Email extends Component {
  state = {
    email: "",
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
          email: res.data.email,
        });
      })
      .catch((err) => {
        this.setState({ errors: err, loading: false });
      });
  };

  changeEmail = () => {
    this.setState({ loading: true });
    const { email } = this.state;
    authAxios(this.props.token)
      .put(userAccountInfo, { email })
      .then((res) => {
        this.setState({
          success: "Email change successful!",
          errors: false,
          loading: false,
        });
        this.fetchAccountInfo();
      })
      .catch((err) => {
        this.setState({ errors: err, loading: false, success: false });
      });
  };

  render() {
    const { errors, loading, email, success } = this.state;

    return (
      <div>
        <Form onSubmit={this.changeEmail}>
          <Form.Field>
            <label>Email</label>
            <input
              onChange={this.handleChange}
              value={email}
              type="email"
              name="email"
            />
          </Form.Field>
          <Button type="submit" disabled={loading} loading={loading} primary>
            Save
          </Button>
        </Form>
        {success && <Message success header="Success!" content={success} />}
        {errors && (
          <Message
            error
            header="There was some errors with your submission"
            content={JSON.stringify(errors)}
          />
        )}
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

export default connect(mapStateToProps)(Email);
