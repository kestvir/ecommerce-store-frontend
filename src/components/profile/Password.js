import React, { Component } from 'react';
import { authAxios } from '../../utils';
import { connect } from "react-redux";
import { userPasswordChange } from "../../constants";
import { Form, Button, Message, } from "semantic-ui-react";


class Password extends Component {
    state = {
        currentPassword: "",
        newPassword: "",
        loading: null,
        success: null,
        errors: null
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };


    changePassword = () => {
        this.setState({ loading: true });
        const { currentPassword, newPassword } = this.state;
        authAxios(this.props.token)
            .post(userPasswordChange, { new_password: newPassword, current_password: currentPassword })
            .then(res => {
                this.setState({
                    success: "Password change successful!",
                    errors: false,
                    loading: false,
                    currentPassword: "",
                    newPassword: ""
                })
            })
            .catch(err => {
                this.setState({ errors: err, loading: false, success: false });
            });
    }


    render() {
        const { errors, loading, currentPassword, newPassword, success } = this.state;

        return (
            <div>
                <Form onSubmit={this.changePassword}>
                    <Form.Field>
                        <label>Current Password</label>
                        <input onChange={this.handleChange} value={currentPassword} type="password" name="currentPassword" />
                    </Form.Field>
                    <Form.Field>
                        <label>New Password</label>
                        <input onChange={this.handleChange} value={newPassword} type="password" name="newPassword" />
                    </Form.Field>
                    <Button type="submit" disabled={loading} loading={loading} primary>
                        Save
                </Button>
                </Form>
                {success && (
                    <Message success header="Success!" content={success} />
                )}
                {errors && (
                    <Message
                        error
                        header="There was some errors with your submission"
                        content={JSON.stringify(errors)}
                    />
                )}
            </div>

        )
    }
}


const mapStateToProps = state => {
    return {
        token: state.auth.token,
        isAuth: state.auth.isAuth,
    };
};

export default connect(mapStateToProps)(Password);