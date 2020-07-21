import React from "react";
import { Container, Segment } from 'semantic-ui-react'

const Footer = () => {
    return (
        <Segment inverted vertical style={{ padding: "1rem 0" }} id="footer">
            <Container textAlign='center'>
                <p>© 2020 Copyright: <span style={{ color: "#fff" }}>Kęstutis Virbickas</span></p>
            </Container>
        </Segment>
    )
}


export default Footer;