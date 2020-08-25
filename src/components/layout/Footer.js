import React from "react";
import { Container, Segment } from "semantic-ui-react";

const Footer = () => {
  return (
    <Segment inverted vertical id="footer">
      <Container textAlign="center">
        <p>© 2020 Copyright: Kęstutis Virbickas</p>
      </Container>
    </Segment>
  );
};

export default Footer;
