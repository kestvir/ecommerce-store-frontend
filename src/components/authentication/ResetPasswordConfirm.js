import React from "react";
import axios from "axios";
import {
    Button,
    Form,
    Grid,
    Header,
    Segment,
    Message
} from "semantic-ui-react";
import { userPasswordResetConfirm } from "../../constants";


class ResetPasswordConfirm extends React.Component {
    state = {
        newPassword: "",
        error: null,
        success: null,
        loading: null
    };

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleSubmit = e => {
        const { uid, token } = this.props.match.params;
        this.setState({ loading: true });
        const { newPassword } = this.state;
        axios
            .post(userPasswordResetConfirm, { new_password: newPassword, uid, token })
            .then(res => {
                this.setState({
                    newPassword: "",
                    success: "Password set successful!",
                    error: false,
                    loading: false,
                })
                setTimeout(() => {
                    this.props.history.push('/login')
                }, 1500)
            })
            .catch(err => {
                this.setState({ error: err, loading: false, success: false });
            });

    };


    render() {
        const { newPassword, loading, error, success } = this.state;

        return (
            <Grid
                textAlign="center"
                style={{ height: "100vh" }}
                verticalAlign="middle"
            >
                <Grid.Column style={{ maxWidth: 450 }}>
                    <Header as="h2" color="black" textAlign="center">
                        Enter New Password
                     </Header>

                    {error && (
                        <Message
                            error
                            header="There was some errors with your submission"
                            content={JSON.stringify(error)}
                        />
                    )}

                    {success && (
                        <Message success header="Success!" content={success} />
                    )}

                    <React.Fragment>
                        <Form size="large" onSubmit={this.handleSubmit}>
                            <Segment stacked>
                                <Form.Input
                                    onChange={this.handleChange}
                                    value={newPassword}
                                    name="newPassword"
                                    type="password"
                                    fluid
                                    icon="user"
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
        );
    }
}


export default ResetPasswordConfirm;