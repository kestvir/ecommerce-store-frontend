import React, { Component } from "react";
import axios from "axios";
import { Container, Message, Grid } from "semantic-ui-react";
import Spinner from "../common/Spinner";
import { connect } from "react-redux";
import { productListURL } from "../../constants";
import Product from "./Product";
import { authAxios } from "../../utils";
import { addToCartURL } from "../../constants";
import { fetchCart } from "../../store/actions/cart";

class ProductList extends Component {
  state = {
    loading: false,
    error: null,
    data: [],
  };

  componentDidMount() {
    this.setState({ loading: true });
    axios
      .get(productListURL)
      .then((res) => {
        this.setState({ data: res.data, loading: false });
      })
      .catch((err) => {
        this.setState({ error: err, loading: false });
      });
  }

  handleAddToCart = (slug) => {
    const { fetchCart, token } = this.props;
    this.setState({ loading: true });
    authAxios(token)
      .post(addToCartURL, { slug })
      .then((res) => {
        fetchCart(token);
        this.setState({ loading: false });
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status === 401) {
          this.setState({ error: "You are not logged in.", loading: false });
        } else {
          this.setState({ error: err, loading: false });
        }
      });
  };

  render() {
    const { data, error, loading } = this.state;
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
        <Grid doubling stackable centered columns={4}>
          {data.map((product) => {
            return (
              <Product
                key={product.id}
                loading={loading}
                {...product}
                handleAddToCart={this.handleAddToCart}
              />
            );
          })}
        </Grid>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
  };
};

export default connect(mapStateToProps, { fetchCart })(ProductList);
