import React from "react";
import { Item, Label } from "semantic-ui-react";
import { BASE_API_URL } from "../../constants";

const OrderPreview = props => {
    const { data } = props;
    return (
        <React.Fragment>
            {data && (
                <React.Fragment>
                    <Item.Group relaxed>
                        {data.order_items.map(orderItem => {
                            return (
                                <Item key={orderItem.id}>
                                    <Item.Image
                                        size="tiny"
                                        src={`${BASE_API_URL}${orderItem.product.image}`}
                                    />
                                    <Item.Content verticalAlign="middle">
                                        <Item.Header as="a">
                                            {orderItem.quantity} x {orderItem.product.name}
                                        </Item.Header>
                                        <Item.Extra>
                                            <Label>&euro;{orderItem.total_item_price}</Label>
                                        </Item.Extra>
                                    </Item.Content>
                                </Item>
                            );
                        })}
                    </Item.Group>

                    <Item.Group>
                        <Item>
                            <Item.Content>
                                <Item.Header>
                                    Order Total: ${data.total}
                                </Item.Header>
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </React.Fragment>
            )}
        </React.Fragment>
    );
}

export default OrderPreview;