import React, { Component } from "react";
import { Link } from "react-router-dom";
import { CardElement, } from "react-stripe-elements";
import { Button, Message, Divider, Header, Select } from "semantic-ui-react";
import { connect } from "react-redux";
import { authAxios } from "../../utils";
import { withRouter } from "react-router-dom";
import { checkoutURL, orderSummaryURL, addressListURL } from "../../constants";
import OrderPreview from "../order/OrderPreview";

class CheckoutForm extends Component {
    state = {
        data: null,
        loading: false,
        error: null,
        success: false,
        shippingAddresses: [],
        billingAddresses: [],
        selectedBillingAddress: "",
        selectedShippingAddress: ""
    };

    componentDidMount() {
        this.handleFetchOrder();
        this.handleFetchBillingAddresses();
        this.handleFetchShippingAddresses();
    }

    handleGetDefaultAddress = addresses => {
        const filteredAddresses = addresses.filter(address => address.default === true);
        if (filteredAddresses.length > 0) {
            console.log(filteredAddresses[0])
            return filteredAddresses[0].id;
        }
        return "";
    };

    handleFetchBillingAddresses = () => {
        this.setState({ loading: true });
        authAxios(this.props.token)
            .get(addressListURL("B"))
            .then(res => {
                this.setState({
                    billingAddresses: res.data.map(address => {
                        return {
                            key: address.id,
                            text: `${address.street_address}, ${address.apartment_address}, ${address.country}`,
                            value: address.id
                        };
                    }),
                    selectedBillingAddress: this.handleGetDefaultAddress(res.data),
                    loading: false
                });
            })
            .catch(err => {
                this.setState({ error: err, loading: false });
            });
    };

    handleFetchShippingAddresses = () => {
        this.setState({ loading: true });
        authAxios(this.props.token)
            .get(addressListURL("S"))
            .then(res => {
                this.setState({
                    shippingAddresses: res.data.map(address => {
                        return {
                            key: address.id,
                            text: `${address.street_address}, ${address.apartment_address}, ${address.country}`,
                            value: address.id
                        };
                    }),
                    selectedShippingAddress: this.handleGetDefaultAddress(res.data),
                    loading: false
                });
            })
            .catch(err => {
                this.setState({ error: err, loading: false });
            });
    };

    handleFetchOrder = () => {
        const { token, history } = this.props;
        this.setState({ loading: true });

        authAxios(token)
            .get(orderSummaryURL)
            .then(res => {
                this.setState({ data: res.data, loading: false });
            })
            .catch(err => {
                if (err.response.status === 404) {
                    history.push("/");
                } else {
                    this.setState({ error: err, loading: false });
                }
            });
    };


    handleSelectChange = (e, { name, value }) => {
        this.setState({ [name]: value });
    };

    submit = e => {
        e.preventDefault();
        this.setState({ loading: true });
        if (this.props.stripe) {
            this.props.stripe.createToken().then(result => {
                if (result.error) {
                    this.setState({ error: result.error.message, loading: false });
                } else {
                    this.setState({ error: null });
                    const {
                        selectedBillingAddress,
                        selectedShippingAddress
                    } = this.state;
                    authAxios(this.props.token)
                        .post(checkoutURL, {
                            stripeToken: result.token.id,
                            selectedBillingAddress,
                            selectedShippingAddress
                        })
                        .then(res => {
                            this.setState({ loading: false, success: true });
                            setTimeout(() => {
                                this.props.history.push('/');
                            }, 3000)
                        })
                        .catch(err => {
                            this.setState({ loading: false, error: err });
                        });
                }
            });
        } else {
            console.log("Stripe is not loaded");
        }
    };

    render() {

        const {
            data,
            error,
            loading,
            success,
            billingAddresses,
            shippingAddresses,
            selectedBillingAddress,
            selectedShippingAddress
        } = this.state;

        return (
            <div>
                <OrderPreview data={data} />
                <Divider />
                <Header>Select a billing address</Header>
                {billingAddresses.length > 0 ? (
                    < Select
                        name="selectedBillingAddress"
                        value={selectedBillingAddress}
                        clearable
                        options={billingAddresses}
                        selection
                        onChange={this.handleSelectChange}
                    />
                ) : (
                        <p>
                            You need to <Link to="/profile">add a billing address</Link>
                        </p>
                    )}
                <Header>Select a shipping address</Header>
                {shippingAddresses.length > 0 ? (
                    <Select
                        name="selectedShippingAddress"
                        value={selectedShippingAddress}
                        clearable
                        options={shippingAddresses}
                        selection
                        onChange={this.handleSelectChange}
                    />
                ) : (
                        <p>
                            You need to <Link to="/profile">add a shipping address</Link>
                        </p>
                    )}
                <Divider />

                {billingAddresses.length < 1 || shippingAddresses.length < 1 ? (
                    <p>You need to add addresses before you can complete your purchase</p>
                ) : (
                        <React.Fragment>
                            <Header>Would you like to complete the purchase?</Header>
                            <p>
                                Enter <b>4242 4242 4242 4242</b> for credid card number, a valid expiration date, a random CVC number and a random zipcode to process the order.
                            </p>
                            <CardElement />
                            {error && (
                                <Message
                                    error
                                    header="There was some errors with your submission"
                                    content={JSON.stringify(error)}
                                />
                            )}
                            {success && (
                                <Message positive>
                                    <Message.Header>Your payment was successful</Message.Header>
                                    <p>
                                        Go to your <b>profiles payment history</b>, if you want to see if the order date.
                                    </p>
                                </Message>
                            )}
                            <Button
                                loading={loading}
                                disabled={loading}
                                primary
                                onClick={this.submit}
                                style={{ marginTop: "10px" }}
                            >
                                Submit
                            </Button>
                        </React.Fragment>
                    )}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        token: state.auth.token,
    };
};

export default withRouter(connect(mapStateToProps)(CheckoutForm));