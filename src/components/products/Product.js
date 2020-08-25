import React from "react";
import { withRouter } from "react-router-dom";
import { Card, Image, Button, Grid } from "semantic-ui-react";

const Product = ({
  image,
  price,
  name,
  slug,
  id,
  handleAddToCart,
  history,
  loading,
}) => {
  const disabled = loading;
  return (
    <Grid.Column className="product-cart-column">
      <Card>
        <Image src={image} />
        <Card.Content>
          <Card.Header>{name}</Card.Header>
          <div className="product-price-and-buttons">
            <Button
              disabled={disabled}
              primary
              onClick={() => handleAddToCart(slug)}
              size="tiny"
            >
              Add
            </Button>
            <Button
              secondary
              onClick={() => history.push(`/products/${id}`)}
              size="tiny"
            >
              Details
            </Button>
            <span className="card-item-price">{price}&euro;</span>
          </div>
        </Card.Content>
      </Card>
    </Grid.Column>
  );
};

export default withRouter(Product);
