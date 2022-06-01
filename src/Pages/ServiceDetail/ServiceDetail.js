import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import useServiceDetail from '../Hooks/useServiceDetail';

const ServiceDetail = () => {
    const { serviceId } = useParams();
    const [service]=useServiceDetail(serviceId);

    return (
        <div className='container mt-5 pt-4 text-center'>
            <h2>You are about to book : {service.name}</h2>
            <Link to={`/checkout/${serviceId}`}>
                <button className='btn btn-primary'>Proceed Checkout</button>
            </Link>
        </div>
    );
};

export default ServiceDetail;