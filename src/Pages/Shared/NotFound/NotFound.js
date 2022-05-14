import React from 'react';
import sleeping from '../../../images/sleeping.jpg';

const NotFound = () => {
    return (
        <div>
            <h2>Mechanic is sleeping</h2>
            <img className='w-100' src={sleeping} alt="" />
        </div>
    );
};

export default NotFound;