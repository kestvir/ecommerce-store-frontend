import React, { Component } from "react";
import { connect } from "react-redux";
import {
    Button,
    Card,
    Divider,
    Grid,
    Header,
    Label,
    Menu,
    Message,
} from "semantic-ui-react";
import {
    countryListURL,
    addressListURL,
    addressDeleteURL,
    userAccountInfo,
} from "../../constants";
import { authAxios } from "../../utils";
import PaymentHistory from "./PaymentHistory"
import AddressForm from "./AddressForm"
import Account from "./Account"
import Spinner from "../common/Spinner";

const CREATE_FORM = "CREATE_FORM";
const UPDATE_FORM = "UPDATE_FORM";

class Profile extends Component {
    state = {
        activeItem: "billingAddress",
        addresses: [],
        countries: [],
        userID: null,
        selectedAddress: null,
        loading: false,
    };

    componentDidMount() {
        if (this.props.isAuth) {
            this.handleFetchAddresses();
            this.handleFetchCountries();
            this.handleFetchUserID();
        }
    }

    handleItemClick = name => {
        this.setState({ activeItem: name }, () => {
            this.handleFetchAddresses();
        });
    };

    handleGetActiveItem = () => {
        const { activeItem } = this.state;
        if (activeItem === "billingAddress") {
            return "Billing Address";
        } else if (activeItem === "shippingAddress") {
            return "Shipping Address";
        } else if (activeItem === "account") {
            return "Account";
        } else if (activeItem === "username") {
            return "Username";
        } else if (activeItem === "email") {
            return "Email";
        } else if (activeItem === "password") {
            return "Password";
        }
        return "Payment History";
    };

    handleFormatCountries = countries => {
        const keys = Object.keys(countries);
        return keys.map(k => {
            return {
                key: k,
                text: countries[k],
                value: k
            };
        });
    };

    handleDeleteAddress = addressID => {
        this.setState({ loading: true });
        authAxios(this.props.token)
            .delete(addressDeleteURL(addressID))
            .then(res => {
                this.handleCallback();
            })
            .catch(err => {
                this.setState({ error: err, loading: false });
            });
    };

    handleSelectAddress = address => {
        this.setState({ selectedAddress: address });
    };

    handleFetchUserID = () => {
        this.setState({ loading: true });
        authAxios(this.props.token)
            .get(userAccountInfo)
            .then(res => {
                this.setState({ userID: res.data.id });
            })
            .catch(err => {
                this.setState({ error: err, loading: false });
            });
    };

    handleFetchCountries = () => {
        authAxios(this.props.token)
            .get(countryListURL)
            .then(res => {
                this.setState({ countries: this.handleFormatCountries(res.data) });
            })
            .catch(err => {
                this.setState({ error: err });
            });
    };

    handleFetchAddresses = () => {
        this.setState({ loading: true });
        const { activeItem } = this.state;
        authAxios(this.props.token)
            .get(addressListURL(activeItem === "billingAddress" ? "B" : "S"))
            .then(res => {
                this.setState({ addresses: res.data, loading: false });
            })
            .catch(err => {
                this.setState({ error: err });
            });
    };

    handleCallback = () => {
        this.handleFetchAddresses();
        this.setState({ selectedAddress: null });
    };

    // if a non adress component active, which is it?
    whichNonAddressComponentActive = () => {
        const { activeItem } = this.state;

        if (activeItem === "username" || activeItem === "email" || activeItem === "password") {
            return <Account activeItem={activeItem} />
        } else if (activeItem === "paymentHistory") {
            return <PaymentHistory />
        }
        return null;
    }

    renderAddresses = () => {
        const {
            activeItem,
            addresses,
            countries,
            selectedAddress,
            userID
        } = this.state;
        return (
            <React.Fragment>
                <Card.Group>
                    {addresses.map(address => {
                        return (
                            <Card key={address.id}>
                                <Card.Content>
                                    {address.default && (
                                        <Label as="a" color="blue" ribbon="right">
                                            Default
                                        </Label>
                                    )}
                                    <Card.Header>
                                        {address.street_address}, {address.apartment_address}
                                    </Card.Header>
                                    <Card.Meta>{address.city},{address.country}</Card.Meta>
                                    <Card.Description>{address.zip}</Card.Description>
                                </Card.Content>
                                <Card.Content extra>
                                    <Button color="yellow" onClick={() => this.handleSelectAddress(address)}>
                                        Update
                                    </Button>
                                    <Button color="red" onClick={() => this.handleDeleteAddress(address.id)}>
                                        Delete
                                    </Button>
                                </Card.Content>
                            </Card>
                        );
                    })}
                </Card.Group>
                {addresses.length > 0 ? <Divider /> : null}
                {selectedAddress === null ? (
                    <AddressForm
                        activeItem={activeItem}
                        countries={countries}
                        formType={CREATE_FORM}
                        userID={userID}
                        callback={this.handleCallback}
                    />
                ) : null}
                {selectedAddress && (
                    <AddressForm
                        activeItem={activeItem}
                        userID={userID}
                        countries={countries}
                        address={selectedAddress}
                        formType={UPDATE_FORM}
                        callback={this.handleCallback}
                    />
                )}
            </React.Fragment>
        );
    };

    render() {
        const { activeItem, error, loading } = this.state;

        let activeNonAddressComponent = this.whichNonAddressComponentActive()

        return (
            <Grid container columns={2} divided className="align-content-center">
                <Grid.Row columns={1}>
                    <Grid.Column>
                        {loading && (
                            <Spinner />
                        )}
                        {error && (
                            <Message
                                error
                                header="There was an error"
                                content={JSON.stringify(error)}
                            />
                        )}
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column width={6}>
                        <Menu pointing vertical fluid>
                            <Menu.Item
                                name="Billing Address"
                                active={activeItem === "billingAddress"}
                                onClick={() => this.handleItemClick("billingAddress")}
                            />
                            <Menu.Item
                                name="Shipping Address"
                                active={activeItem === "shippingAddress"}
                                onClick={() => this.handleItemClick("shippingAddress")}
                            />
                            <Menu.Item
                                name="Payment history"
                                active={activeItem === "paymentHistory"}
                                onClick={() => this.handleItemClick("paymentHistory")}
                            />
                            <Menu.Item
                                name="Username"
                                active={activeItem === "username"}
                                onClick={() => this.handleItemClick("username")}
                            />
                            <Menu.Item
                                name="Email"
                                active={activeItem === "email"}
                                onClick={() => this.handleItemClick("email")}
                            />
                            <Menu.Item
                                name="Password"
                                active={activeItem === "password"}
                                onClick={() => this.handleItemClick("password")}
                            />
                        </Menu>
                    </Grid.Column>
                    <Grid.Column width={10}>
                        <Header>{this.handleGetActiveItem()}</Header>
                        <Divider />
                        {activeItem !== "billingAddress" && activeItem !== "shippingAddress" ? (
                            activeNonAddressComponent
                        ) : (
                                this.renderAddresses()
                            )}

                    </Grid.Column>
                </Grid.Row>
            </Grid >
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuth: state.auth.isAuth,
        token: state.auth.token
    };
};

export default connect(mapStateToProps)(Profile);