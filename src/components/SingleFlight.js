import React from 'react';
import Form from './Form';

function SingleFlight({ onFilter }) {
    return (
        <>
            <Form onFilter = {onFilter} />  
        </>
    )
}

export default SingleFlight
