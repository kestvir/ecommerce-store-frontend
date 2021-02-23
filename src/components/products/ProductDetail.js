import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";
import {
  Button,
  Form,
  Label,
  Container,
  Icon,
  Message,
  Input,
  Item,
} from "semantic-ui-react";
import Spinner from "../common/Spinner";
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
      match: { params },
    } = this.props;
    this.setState({ loading: true });
    axios
      .get(productDetailURL(params.productID))
      .then((res) => {
        this.setState({ data: res.data, loading: false });
      })
      .catch((err) => {
        this.setState({ error: err, loading: false });
      });
  };

  handleChange = (e) => {
    console.log(e.target.value);
    this.setState({ [e.target.name]: parseInt(e.target.value) });
  };

  handleAddToCart = (slug) => {
    const { token, fetchCart } = this.props;
    this.setState({ loading: true });
    authAxios(token)
      .post(addToCartURL, { slug, quantity: this.state.quantity })
      .then((res) => {
        fetchCart(token);
        this.setState({ loading: false });
      })
      .catch((err) => {
        if (err.response.status === 401) {
          this.setState({ error: "You are not logged in.", loading: false });
        } else {
          this.setState({ error: err, loading: false });
        }
      });
  };

  render() {
    const { data, error, loading } = this.state;
    const product = data;
    return (
      <Container
        style={{ flexDirection: "column" }}
        className="container-content align-content-center"
      >
        {loading && <Spinner />}
        {error && (
          <Message
            style={{ marginTop: "1rem", textAlign: "center" }}
            error
            header="Something went wrong."
            content={JSON.stringify(error)}
          />
        )}
        <Item.Group style={{ margin: 0 }}>
          <Item className="item-detail-container">
            <Item.Image className="item-detail-image" src={product.image} />
            <Item.Content>
              <Item.Header className="item-detail-header">
                {product.name}
              </Item.Header>
              <Item.Meta className="item-detail-price">
                <span>{product.price}&euro;</span>
              </Item.Meta>
              <Item.Description>{product.description}</Item.Description>
              <Item.Extra>
                <Form>
                  <Form.Field inline className="item-detail-options">
                    <Label pointing="right">Quantity</Label>
                    <Input
                      onChange={this.handleChange}
                      className="item-quantity-input"
                      control="input"
                      name="quantity"
                      type="number"
                      value={this.state.quantity}
                      min={1}
                    />
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

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    isAuth: state.auth.isAuth,
  };
};

export default withRouter(
  connect(mapStateToProps, { fetchCart })(ProductDetail)
);
