import axios from "axios";
import React from "react";
import { Button, Form } from "react-bootstrap";
import { useAuthState } from "react-firebase-hooks/auth";
import { useParams } from "react-router-dom";
import auth from "../../../firebase.init";
import useServiceDetail from "../../Hooks/useServiceDetail";
import { toast } from 'react-toastify';

const CheckOut = () => {
  const { serviceId } = useParams();
  const [service] = useServiceDetail(serviceId);
  const [user] = useAuthState(auth);
  
 const handlePlaceOrder=event=>{
     event.preventDefault();
     const order={
         email:user.email,
         service:service.name,
         serviceId:serviceId,
         address:event.target.address.value,
         phone:event.target.phone.value
     }
     axios.post('https://shielded-everglades-68842.herokuapp.com/order',order)
     .then(response=>{
         const {data} = response;
         if(data.insertedId){
             toast('Your order is booked!!');
             event.target.reset();
         }
     })
 }

  return (
    <div className="container mt-5 pt-3">
      <div className="w-50 mx-auto">
        <h2 className="mb-4 mt-3 text-primary text-center">Please Order: {service.name}</h2>
        <Form onSubmit={handlePlaceOrder}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control name="name" type="text" value={user?.displayName} required readOnly disabled/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control name="email" type="email" value={user?.email} required readOnly disabled/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control name="service" type="text" value={service.name} required readOnly disabled/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control name="address" type="text" placeholder="Address" autoComplete="off" required/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control name="phone" type="text" placeholder="Phone Number" autoComplete="off" required/>
          </Form.Group>
          <Button className='d-block mx-auto w-50' variant="primary" type="submit">
            Place Order
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default CheckOut;
