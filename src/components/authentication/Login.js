import React from "react";
import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment,
  Container,
} from "semantic-ui-react";
import uuid from "react-uuid";
import { connect } from "react-redux";
import { NavLink, Redirect } from "react-router-dom";
import { login, resetLoginErrs } from "../../store/actions/auth";
import { handleAuthErrs } from "../../utils";

class LoginForm extends React.Component {
  state = {
    username: "",
    password: "",
  };

  componentWillUnmount() {
    this.props.resetLoginErrs();
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { username, password } = this.state;
    this.props.login(username, password);
  };

  render() {
    const { error, loading, isAuth } = this.props;
    const { username, password } = this.state;

    if (isAuth) {
      return <Redirect to="/" />;
    }

    return (
      <Container className="container-content align-content-center">
        <Grid textAlign="center" verticalAlign="middle">
          <Grid.Column className="auth-form">
            <Header as="h2" color="black" textAlign="center">
              Log-in to your account
            </Header>

            {error &&
              handleAuthErrs(error).map((err) => {
                return (
                  <p style={{ color: "red" }} key={uuid()}>
                    {err}
                  </p>
                );
              })}

            <React.Fragment>
              <Form size="large" onSubmit={this.handleSubmit}>
                <Segment stacked>
                  <Form.Input
                    onChange={this.handleChange}
                    value={username}
                    name="username"
                    fluid
                    icon="user"
                    iconPosition="left"
                    placeholder="Username"
                  />
                  <Form.Input
                    onChange={this.handleChange}
                    fluid
                    value={password}
                    name="password"
                    icon="lock"
                    iconPosition="left"
                    placeholder="Password"
                    type="password"
                  />

                  <Button
                    color="blue"
                    fluid
                    size="large"
                    loading={loading}
                    disabled={loading}
                  >
                    Login
                  </Button>
                </Segment>
              </Form>
              <Message>
                <p>
                  New to us? <NavLink to="/signup">Sign Up</NavLink>
                </p>
                <p>
                  Forgot password?{" "}
                  <NavLink to="/reset-password">Reset Password</NavLink>
                </p>
              </Message>
            </React.Fragment>
          </Grid.Column>
        </Grid>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    error: state.auth.loginError,
    isAuth: state.auth.isAuth,
  };
};

export default connect(mapStateToProps, { login, resetLoginErrs })(LoginForm);
