import React from "react";
import { useNavigate } from "react-router-dom";

const Service = ({ service }) => {
  const { id, name, price, description, img } = service;
  const navigate = useNavigate();
  const navigateToServiceDetail = (id) => {
    navigate(`/service/${id}`);
  };
  return (
    <div className="g-5 col-sm-12 col-md-6 col-lg-4">
      <div className="card text-center">
        <img src={img} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">
            {id}.{name}
          </h5>
          <p className="card-text">Price :{price}</p>
          <p className="card-text">
            <small>{description}</small>
          </p>
          <button
            onClick={() => navigateToServiceDetail(id)}
            className="btn btn-primary"
          >
            Take Service
          </button>
        </div>
      </div>
    </div>
  );
};

export default Service;
