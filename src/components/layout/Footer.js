import React from 'react';
import {
    Container,
    List,
    Segment,
} from 'semantic-ui-react'

const Footer = () => {
    return (
        <Segment inverted vertical style={{ padding: '1rem 0' }} id="footer">
            <Container textAlign='center'>
                <List horizontal inverted divided link size='small'>
                    <List.Item as='a' href='#'>
                        Contact Us
                </List.Item>
                    <List.Item as='a' href='#'>
                        Terms and Conditions
                </List.Item>
                    <List.Item as='a' href='#'>
                        Privacy Policy
                </List.Item>
                </List>
            </Container>
        </Segment>
    )
}


export default Footer;