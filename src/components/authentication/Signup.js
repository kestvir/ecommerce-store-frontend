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
import { connect } from "react-redux";
import { NavLink, Redirect } from "react-router-dom";
import { register, resetRegisterErrs } from "../../store/actions/auth";
import AuthErrors from "../common/AuthErrors";

class RegistrationForm extends React.Component {
  state = {
    username: "",
    email: "",
    password: "",
    password2: "",
    passwordsMatchErr: null,
  };

  componentWillUnmount() {
    this.props.resetRegisterErrs();
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { username, email, password, password2 } = this.state;
    const newUser = {
      username,
      password,
      email,
    };

    if (password !== password2) {
      this.setState({ passwordsMatchErr: true });
      this.props.resetRegisterErrs();
    } else {
      this.setState({ passwordsMatchErr: false });
      this.props.register(newUser);
    }
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const {
      username,
      email,
      password,
      password2,
      passwordsMatchErr,
    } = this.state;
    const { error, loading, token } = this.props;

    if (token) {
      return <Redirect to="/" />;
    }
    return (
      <Container className="container-content align-content-center">
        <Grid textAlign="center" verticalAlign="middle">
          <Grid.Column className="auth-form">
            <Header as="h2" color="black" textAlign="center">
              Signup to your account
            </Header>

            {error && <AuthErrors error={error} />}

            {passwordsMatchErr && (
              <p style={{ color: "red" }}>
                {" "}
                PASSWORD: The passwords do not match
              </p>
            )}

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
                    value={email}
                    name="email"
                    fluid
                    icon="mail"
                    iconPosition="left"
                    placeholder="E-mail address"
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
                  <Form.Input
                    onChange={this.handleChange}
                    fluid
                    value={password2}
                    name="password2"
                    icon="lock"
                    iconPosition="left"
                    placeholder="Confirm password"
                    type="password"
                  />

                  <Button
                    color="blue"
                    fluid
                    size="large"
                    loading={loading}
                    disabled={loading}
                  >
                    Signup
                  </Button>
                </Segment>
              </Form>
              <Message>
                Already have an account? <NavLink to="/login">Login</NavLink>
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
    error: state.auth.registerError,
    token: state.auth.token,
  };
};

export default connect(mapStateToProps, { register, resetRegisterErrs })(
  RegistrationForm
);
