import React, { Component } from "react";
import {
    Container,
    Menu,
} from "semantic-ui-react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../store/actions/auth";
import CartDropdown from "./CartDropdown";

class Nav extends Component {

    render() {
        const { isAuth } = this.props;
        return (
            <div id="nav">
                <Menu inverted >
                    <Container>
                        <Link to="/">
                            <Menu.Item header>Products</Menu.Item>
                        </Link>
                        {isAuth ? (
                            <React.Fragment>
                                <Menu.Menu position="right">
                                    <Link to="/profile">
                                        <Menu.Item>Profile</Menu.Item>
                                    </Link>
                                    <CartDropdown />
                                    <Menu.Item header onClick={this.props.logout}>
                                        Logout
                                    </Menu.Item>
                                </Menu.Menu>
                            </React.Fragment>
                        ) : (
                                <Menu.Menu position="right">
                                    <Link to="/login">
                                        <Menu.Item header>Login</Menu.Item>
                                    </Link>
                                    <Link to="/signup">
                                        <Menu.Item header>Signup</Menu.Item>
                                    </Link>
                                </Menu.Menu>
                            )}
                    </Container>
                </Menu>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuth: state.auth.isAuth,
    };
};

export default withRouter(
    connect(
        mapStateToProps,
        { logout }
    )(Nav));
