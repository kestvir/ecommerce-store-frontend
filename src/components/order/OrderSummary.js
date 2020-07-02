import React, { Component } from "react";
import {
    Container,
    Icon,
    Table,
    Button,
    Message,
} from "semantic-ui-react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchCart, addItemToCart, removeItemQuantityFromCart, removeItemFromCart } from "../../store/actions/cart";



class OrderSummary extends Component {
    componentDidMount() {
        const { isAuth, fetchCart, token } = this.props;
        if (isAuth) fetchCart(token)
    }

    render() {
        const { cart, addItemToCart, removeItemQuantityFromCart, removeItemFromCart, error, token, loading } = this.props;
        return (
            <Container style={{ marginTop: "25px" }}>
                {error && (
                    <Message
                        error
                        header="There was an error"
                        content={JSON.stringify(error)}
                    />
                )}
                {cart && cart.order_items.length > 0
                    ? (
                        <Table celled>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>Item #</Table.HeaderCell>
                                    <Table.HeaderCell>Item name</Table.HeaderCell>
                                    <Table.HeaderCell>Item price</Table.HeaderCell>
                                    <Table.HeaderCell>Item quantity</Table.HeaderCell>
                                    <Table.HeaderCell>Total item price</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>

                            <Table.Body>
                                {cart.order_items.map((orderItem, i) => {
                                    return (
                                        <Table.Row key={orderItem.id}>
                                            <Table.Cell>{i + 1}</Table.Cell>
                                            <Table.Cell>
                                                {orderItem.product.name}
                                            </Table.Cell>
                                            <Table.Cell>{orderItem.product.price}&euro;</Table.Cell>
                                            <Table.Cell textAlign="center">
                                                <Icon
                                                    name="minus"
                                                    style={{ float: "left", cursor: "pointer" }}
                                                    onClick={() =>
                                                        removeItemQuantityFromCart(orderItem.product.slug, token)
                                                    }
                                                />
                                                {orderItem.quantity}
                                                <Icon
                                                    name="plus"
                                                    style={{ float: "right", cursor: "pointer" }}
                                                    onClick={() =>
                                                        addItemToCart(
                                                            orderItem.product.slug, token
                                                        )
                                                    }
                                                />
                                            </Table.Cell>
                                            <Table.Cell>
                                                {orderItem.total_item_price}&euro;
                                            <Button size="mini"
                                                    name="trash"
                                                    color="red"
                                                    disabled={loading}
                                                    style={{ float: "right", cursor: "pointer" }}
                                                    onClick={() => removeItemFromCart(orderItem.id, token)}
                                                >
                                                    delete
                                            </Button>
                                            </Table.Cell>
                                        </Table.Row>
                                    );
                                })}
                                <Table.Row>
                                    <Table.Cell />
                                    <Table.Cell />
                                    <Table.Cell />
                                    <Table.Cell textAlign="right" colSpan="2">
                                        Order Total: {cart.total}&euro;
                                </Table.Cell>
                                </Table.Row>
                            </Table.Body>

                            <Table.Footer>
                                <Table.Row>
                                    <Table.HeaderCell colSpan="5">
                                        <Link to="/checkout">
                                            <Button floated="right" color="yellow">
                                                Checkout
                                        </Button>
                                        </Link>
                                    </Table.HeaderCell>
                                </Table.Row>
                            </Table.Footer>
                        </Table>
                    )
                    : <h2>No items in your cart...</h2>
                }
            </Container>
        );
    }
}

const mapStateToProps = state => {
    return {
        token: state.auth.token,
        isAuth: state.auth.isAuth,
        cart: state.cart.shoppingCart,
        loading: state.cart.loading,
        error: state.cart.error,
    };
};

export default connect(mapStateToProps,
    {
        fetchCart,
        addItemToCart,
        removeItemQuantityFromCart,
        removeItemFromCart
    })
    (OrderSummary);