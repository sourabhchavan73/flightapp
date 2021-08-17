import React from 'react';
import Form from './Form';

const ReturnFlight = ({ onFilter }) => {

    return (
        <div>
            <Form 
                isReturn= 'true' 
                onFilter = {onFilter} />
        </div>
    )
}

export default ReturnFlight;
