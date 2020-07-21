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
import { register } from "../../store/actions/auth";

class RegistrationForm extends React.Component {
    state = {
        username: "",
        email: "",
        password: "",
        password2: "",
        passwordsMatchErr: null
    };

    handleSubmit = e => {
        e.preventDefault();
        const { username, email, password, password2 } = this.state;

        if (password !== password2) {
            return this.setState({ passwordsMatchErr: false });
        }
        else {
            const newUser = {
                username,
                password,
                email,
            };
            this.setState({ passwordsMatchErr: true });
            this.props.register(newUser);
        }

    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleLoginErrors = (errObj) => {
        console.log(errObj.response)
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
        const { username, email, password, password2, passwordsMatchErr } = this.state;
        const { error, loading, token } = this.props;
        if (token) {
            return <Redirect to="/" />;
        }
        return (
            <Grid
                textAlign="center"
                className="container-content"
                verticalAlign="middle"
            >
                <Grid.Column style={{ maxWidth: 450 }}>
                    <Header as="h2" color="black" textAlign="center">
                        Signup to your account
                    </Header>

                    {error && this.handleLoginErrors(error).map(err => {
                        return <p key={uuid()}>{err}</p>
                    })}

                    {passwordsMatchErr === false && <p>The passwords do not match</p>}

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
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.registerError,
        token: state.auth.token
    };
};



export default connect(
    mapStateToProps, { register }
)(RegistrationForm);