import React from "react";
import {
    Button,
    Form,
    Grid,
    Header,
    Message,
    Segment
} from "semantic-ui-react";
import uuid from "react-uuid";
import { connect } from "react-redux";
import { NavLink, Redirect } from "react-router-dom";
import { login } from "../../store/actions/auth";

class LoginForm extends React.Component {
    state = {
        username: "",
        password: ""
    };

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleSubmit = e => {
        e.preventDefault();
        const { username, password } = this.state;
        this.props.login(username, password);
    };

    handleLoginErrors = (errObj) => {
        const errResponse = errObj.response;
        const errArrStrs = [];

        if (errResponse.status !== 400) {
            errArrStrs.push(errObj.message)
        } else {
            const errResponseData = errResponse.data;
            for (let key in errResponseData) {
                if (errResponseData.hasOwnProperty(key)) {
                    errArrStrs.push(`${String(key).toUpperCase()}: ${errResponseData[key]}`);
                }
            };
        }
        return errArrStrs
    }

    render() {
        const { error, loading, isAuth } = this.props;
        const { username, password } = this.state;

        if (isAuth) {
            return <Redirect to="/" />;
        }

        return (
            <Grid
                textAlign="center"
                style={{ height: "100vh" }}
                verticalAlign="middle"
            >
                <Grid.Column style={{ maxWidth: 450 }}>
                    <Header as="h2" color="black" textAlign="center">
                        Log-in to your account
                     </Header>

                    {error && this.handleLoginErrors(error).map(err => {
                        return <p key={uuid()}>{err}</p>
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
                            <p>New to us? <NavLink to="/signup">Sign Up</NavLink></p>
                            <p>Forgot password? <NavLink to="/reset-password">Reset Password</NavLink></p>
                        </Message>
                    </React.Fragment>
                </Grid.Column>
            </Grid>
        );
    }
}


const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.loginError,
        isAuth: state.auth.isAuth
    };
};

export default connect(
    mapStateToProps,
    { login }
)(LoginForm);