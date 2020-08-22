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
import { userPasswordResetConfirm } from "../../constants";

class ResetPasswordConfirm extends React.Component {
  state = {
    newPassword: "",
    error: null,
    success: null,
    loading: null,
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    const { uid, token } = this.props.match.params;
    this.setState({ loading: true });
    const { newPassword } = this.state;
    axios
      .post(userPasswordResetConfirm, { new_password: newPassword, uid, token })
      .then((res) => {
        this.setState({
          newPassword: "",
          success: "Password set successful!",
          error: false,
          loading: false,
        });
        setTimeout(() => {
          this.props.history.push("/login");
        }, 1500);
      })
      .catch((err) => {
        this.setState({ error: err, loading: false, success: false });
      });
  };

  render() {
    const { newPassword, loading, error, success } = this.state;
    console.log(JSON.parse(error));

    return (
      <Container className="container-content align-content-center">
        <Grid textAlign="center" verticalAlign="middle">
          <Grid.Column className="auth-form">
            <Header as="h2" color="black" textAlign="center">
              Enter New Password
            </Header>

            {error && (
              <Message
                error
                header="There were some errors with your submission"
                content={JSON.stringify(error)}
              />
            )}

            {success && <Message success header="Success!" content={success} />}

            <React.Fragment>
              <Form size="large" onSubmit={this.handleSubmit}>
                <Segment stacked>
                  <Form.Input
                    onChange={this.handleChange}
                    value={newPassword}
                    name="newPassword"
                    type="password"
                    fluid
                    icon="lock"
                    iconPosition="left"
                    placeholder="Enter New Password"
                  />

                  <Button
                    color="blue"
                    fluid
                    size="large"
                    loading={loading}
                    disabled={loading}
                  >
                    Reset
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

export default ResetPasswordConfirm;
