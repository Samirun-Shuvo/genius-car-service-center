import React from 'react';
import useServices from '../Hooks/useServices';

const ManageServices = () => {
    const [services,setServices]= useServices();
    const handleDelete = id =>{
        const proceed = window.confirm('Are you sure?')
        if(proceed){
            const url =`https://shielded-everglades-68842.herokuapp.com/service/${id}`;
            fetch(url,{
                method: 'DELETE'
            })
            .then(res => res.json())
            .then(data=>{
                console.log(data);
                const remaining=services.filter(service =>service._id !== id);
                setServices(remaining);
            })
        }
    }
    return (
        <div className='container mt-5 pt-4'>
            <div className='text-center'>
            <h2 className='text-center text-primary mb-3'>Manage your services</h2>
            <hr />
            {
                services.map(service =><div key={service._id}>
                    <h4>{service.name} <button onClick={()=>handleDelete(service._id)} className='btn btn-primary'>x</button></h4>  
                </div>)
            }
            </div>
        </div>
    );
};

export default ManageServices;