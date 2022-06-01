import React, { useState } from 'react';
import { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import auth from './../../firebase.init';
import { signOut } from 'firebase/auth';
import axiosPrivate from './../../api/axiosPrivate';

const Order = () => {
    const [user]= useAuthState(auth);
    const [orders,setOrders]= useState([]);
    const navigate = useNavigate();
    useEffect(()=>{
        const getOrders=async()=>{
            const email = user.email;
            const url =`https://shielded-everglades-68842.herokuapp.com/order?email=${email}`;
            try{
                const {data} = await axiosPrivate.get(url);
                setOrders(data);
            }
            catch(error){
                console.log(error.message);
                if (error.response.status===401 || error.response.status===403) {
                    signOut(auth);
                    navigate('/login')
                }
            }
        }
        getOrders();
        
    },[user])
    return (
        <div className='container mt-5 pt-3'>
            <h2>Your Orders: {orders.length}</h2>
        </div>
    );
};

export default Order;