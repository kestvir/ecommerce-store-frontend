import React from 'react';
import { Grid, Container } from 'semantic-ui-react'
import { Link } from "react-router-dom";



const PageNotFound = () => {
    return (
        <Container className="container-content .align-content-center">
            <Grid >
                <Grid.Column textAlign="center" verticalAlign='middle' >
                    <h2 style={{ fontSize: "60px" }}>404</h2>
                    <h3 style={{ fontSize: "35px" }}>The page you requested was not found.</h3>
                    <Link style={{ fontSize: "20px" }} to="/">Back to Home</Link>
                </Grid.Column>
            </Grid>
        </Container>
    )
}

export default PageNotFound;