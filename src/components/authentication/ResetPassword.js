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
import { connect } from "react-redux";
import { login } from "../../store/actions/auth";
import { userPasswordReset } from "../../constants";


class LoginForm extends React.Component {
    state = {
        email: "",
        error: null,
        success: null,
        loading: null
    };

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleSubmit = e => {
        this.setState({ loading: true });
        const { email } = this.state;
        axios
            .post(userPasswordReset, { email })
            .then(res => {
                this.setState({
                    email: "",
                    success: "Email sent successfully!",
                    error: false,
                    loading: false,
                })
                setTimeout(() => {
                    this.props.history.push('/')
                }, 1500)
            })
            .catch(err => {
                this.setState({ error: err, loading: false, success: false });
            });

    };


    render() {
        const { email, loading, error, success } = this.state;

        return (
            <Grid
                textAlign="center"
                className="container-content"
                verticalAlign="middle"
            >
                <Grid.Column style={{ maxWidth: 450 }}>
                    <Header as="h2" color="black" textAlign="center">
                        Reset Password
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
                                    value={email}
                                    name="email"
                                    type="email"
                                    fluid
                                    icon="user"
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
        );
    }
}


const mapStateToProps = state => {
    return {
        token: state.auth.token,
    };
};

export default connect(
    mapStateToProps,
    { login }
)(LoginForm);