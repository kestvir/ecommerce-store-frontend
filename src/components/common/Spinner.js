import React from 'react';
import {
    Dimmer,
    Loader,
    Segment
} from "semantic-ui-react"

const Spinner = () => {
    return (
        <Segment>
            <Dimmer active inverted>
                <Loader size='large'>Loading</Loader>
            </Dimmer>
        </Segment>
    )
}

export default Spinner;