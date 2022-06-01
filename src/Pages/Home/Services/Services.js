import React, { useEffect, useState } from "react";
import Service from "../Service/Service";
import "./Services.css";

const Services = () => {
  const [services, setServices] = useState([]);
  useEffect(() => {
    fetch("https://shielded-everglades-68842.herokuapp.com/service")
      .then((res) => res.json())
      .then((data) => setServices(data));
  }, []);
  return (
    <div id="services" className="container mb-5 mt-5 pt-5">
      <div className="mt-3">
        <h1 className="text-primary text-center">Our Services</h1>
        <div className="row">
          {services.map((service) => (
            <Service key={service._id} service={service}></Service>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
