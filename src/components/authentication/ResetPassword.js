import React from "react";
import axios from "axios";
import {
  Button,
  Form,
  Grid,
  Header,
  Segment,
  Message,
  Container,
} from "semantic-ui-react";
import { connect } from "react-redux";
import { login } from "../../store/actions/auth";
import { userPasswordReset } from "../../constants";
import AuthErrors from "../common/AuthErrors";

class LoginForm extends React.Component {
  state = {
    email: "",
    error: null,
    success: null,
    loading: null,
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    this.setState({ loading: true });
    const { email } = this.state;
    axios
      .post(userPasswordReset, { email })
      .then((res) => {
        this.setState({
          email: "",
          success:
            "If you provided a registed email, you will receive password reset shortly!",
          error: false,
          loading: false,
        });
        setTimeout(() => {
          this.props.history.push("/");
        }, 2700);
      })
      .catch((err) => {
        this.setState({ error: err, loading: false, success: false });
      });
  };

  render() {
    const { email, loading, error, success } = this.state;

    return (
      <Container className="container-content align-content-center">
        <Grid textAlign="center" verticalAlign="middle">
          <Grid.Column className="auth-form">
            <Header as="h2" color="black" textAlign="center">
              Reset Password
            </Header>

            {error && <AuthErrors error={error} />}

            {success && <Message success header="Success!" content={success} />}

            <React.Fragment>
              <Form size="large" onSubmit={this.handleSubmit}>
                <Segment stacked>
                  <Form.Input
                    onChange={this.handleChange}
                    value={email}
                    name="email"
                    type="email"
                    fluid
                    icon="mail"
                    iconPosition="left"
                    placeholder="Enter Your Email"
                  />

                  <Button
                    color="blue"
                    fluid
                    size="large"
                    loading={loading}
                    disabled={loading}
                  >
                    Send Email
                  </Button>
                </Segment>
              </Form>
            </React.Fragment>
          </Grid.Column>
        </Grid>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
  };
};

export default connect(mapStateToProps, { login })(LoginForm);
