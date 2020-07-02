import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";
import {
    Button,
    Form,
    Label,
    Container,
    Dimmer,
    Icon,
    Loader,
    Message,
    Segment,
    Input,
    Item
} from "semantic-ui-react";
import { productDetailURL, addToCartURL } from "../../constants";
import { fetchCart } from "../../store/actions/cart";
import { authAxios } from "../../utils";


class ProductDetail extends React.Component {
    state = {
        loading: false,
        error: null,
        quantity: 1,
        data: [],
    };

    componentDidMount() {
        this.handleFetchItem();
    }

    handleFetchItem = () => {
        const {
            match: { params }
        } = this.props;
        this.setState({ loading: true });
        axios
            .get(productDetailURL(params.productID))
            .then(res => {
                this.setState({ data: res.data, loading: false });
            })
            .catch(err => {
                this.setState({ error: err, loading: false });
            });
    };

    handleChange = e => {
        this.setState({ [e.target.name]: parseInt(e.target.value) });
    };

    handleAddToCart = (slug, quantity) => {
        const { token, fetchCart } = this.props
        this.setState({ loading: true });
        authAxios(token)
            .post(addToCartURL, { slug, quantity })
            .then(res => {
                fetchCart(token);
                this.setState({ loading: false });
            })
            .catch(err => {
                this.setState({ error: err, loading: false });
            });
    };


    render() {
        const { data, error, loading } = this.state;
        const product = data;
        return (
            <Container style={{ marginTop: "3rem" }}>
                {error && (
                    <Message
                        error
                        header="There was some errors with your submission"
                        content={JSON.stringify(error)}
                    />
                )}
                {loading && (
                    <Segment>
                        <Dimmer active inverted>
                            <Loader inverted>Loading</Loader>
                        </Dimmer>
                    </Segment>
                )}
                <Item.Group>
                    <Item>
                        <Item.Image src={product.image} />
                        <Item.Content>
                            <Item.Header>{product.name}</Item.Header>
                            <Item.Meta>
                                <span className='price'>{product.price}&euro;</span>
                            </Item.Meta>
                            <Item.Description>{product.description}</Item.Description>
                            <Item.Extra>
                                <Form>
                                    <Form.Field inline>
                                        <Label pointing='right'>Quantity</Label>
                                        <Input
                                            onChange={this.handleChange}
                                            control='input'
                                            name="quantity"
                                            type='number'
                                            value={this.state.quantity}
                                            min={1} />
                                        <Button
                                            style={{ marginLeft: "10px" }}
                                            primary
                                            icon
                                            labelPosition="right"
                                            onClick={() => this.handleAddToCart(product.slug)}
                                        >
                                            Add to cart
                                    <Icon name="cart plus" />
                                        </Button>
                                    </Form.Field>
                                </Form>
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                </Item.Group>
            </Container>
        );
    }
}


const mapStateToProps = state => {
    return {
        token: state.auth.token,
        isAuth: state.auth.isAuth
    };
};


export default withRouter(
    connect(
        mapStateToProps,
        { fetchCart }
    )(ProductDetail)
);


