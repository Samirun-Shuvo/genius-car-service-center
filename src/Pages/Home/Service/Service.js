import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Service.css';

const Service = ({ service }) => {
    const { id, name, price, img, description } = service;
    const navigate = useNavigate();
    const navigateToServiceDetail = id => {
        navigate(`/service/${id}`);
    }
    return (
        <div className="g-5 col-sm-12 col-md-6 col-lg-4">
            <div className="card text-center">
                <img src={img} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{name}</h5>
                    <p className="card-text">Price :{price}</p>
                    <p className="card-text"><small>{description}</small></p>
                    <a onClick={() => navigateToServiceDetail(id)} href="" className="btn btn-primary">Book:{name}</a>
                </div>
            </div>
        </div>
    );
};

export default Service;