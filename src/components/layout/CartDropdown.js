import React, { Component } from 'react';
import { Dropdown } from "semantic-ui-react";
import { connect } from "react-redux";
import { fetchCart } from "../../store/actions/cart";
import { withRouter } from "react-router-dom";


class CartDropdown extends Component {
    componentDidMount() {
        const { fetchCart, isAuth, token } = this.props;
        if (isAuth) fetchCart(token);
    }



    calcItemsInCart = () => {
        const orderItemsArr = this.props.cart.order_items

        return orderItemsArr.reduce((accumulator, currentItem) => {
            return accumulator + currentItem.quantity
        }, 0)
    }


    render() {
        const { cart, loading } = this.props
        return (
            <Dropdown
                icon="cart"
                loading={loading}
                text={`${cart !== null ? this.calcItemsInCart() : 0}`}
                pointing
                className="link item"
            >
                <Dropdown.Menu>
                    {cart !== null ? (
                        <React.Fragment>
                            {cart.order_items.map(order_item => {
                                return (
                                    <Dropdown.Item key={order_item.id}>
                                        {order_item.quantity} x {order_item.product.name}
                                    </Dropdown.Item>
                                );
                            })}
                            {cart.order_items.length < 1 ? (
                                <Dropdown.Item>No items in your cart</Dropdown.Item>
                            ) : null}

                            {cart.order_items.length !== 0 ? (
                                <React.Fragment>
                                    <Dropdown.Divider />
                                    <Dropdown.Item
                                        icon="arrow right"
                                        text="Checkout"
                                        onClick={() =>
                                            this.props.history.push("/order-summary")
                                        }
                                    />
                                </React.Fragment>
                            ) : null}

                        </React.Fragment>
                    ) : (
                            <Dropdown.Item>No items in your cart</Dropdown.Item>
                        )}
                </Dropdown.Menu>
            </Dropdown>
        )
    }
}


const mapStateToProps = state => {
    return {
        token: state.auth.token,
        loading: state.auth.loading,
        cart: state.cart.shoppingCart,
        isAuth: state.auth.isAuth,
    };
};


export default withRouter(connect(mapStateToProps, { fetchCart })(CartDropdown));