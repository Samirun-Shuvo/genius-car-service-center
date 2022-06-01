import React, { useRef } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { useSendPasswordResetEmail } from 'react-firebase-hooks/auth';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import auth from '../../../firebase.init';
import SocialLogin from '../SocialLogin/SocialLogin';
import Loading from './../../Shared/Loading/Loading';
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PageTitle from '../../Shared/PageTitle/PageTitle';
import axios from 'axios';

const Login = () => {
    const emailRef = useRef();
    const passwordRef = useRef('');
    const navigate = useNavigate();
    const location = useLocation();
    let from = location.state?.from?.pathname || "/";
    let errorElement;
    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useSignInWithEmailAndPassword(auth);
    const [sendPasswordResetEmail, sending] = useSendPasswordResetEmail(auth);
    if (loading || sending) {
        return <Loading></Loading>
    }
    if (user) {
        // navigate(from, { replace: true });
    }
    if (error) {
        errorElement = <p className='text-danger'>Error: {error?.message}</p>
    }

    const handleSubmit = async event => {
        event.preventDefault();
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        // console.log(email, password);
        await signInWithEmailAndPassword(email, password);
        const {data}= await axios.post('https://shielded-everglades-68842.herokuapp.com/login',{email});
        localStorage.setItem('accessToken',data.accessToken);
        navigate(from, { replace: true });
    }
    const navigateToRegister = event => {
        navigate('/register');
    }
   
    const resetPassword = async () => {
        const email = emailRef.current.value;
        if (email) {
            await sendPasswordResetEmail(email);
        toast('Sent email');
        }else{
            toast('please enter your email address');
        }
    }
    return (
        <div className='container mx-auto w-50 my-5 pt-4'>
        <PageTitle title='Login'></PageTitle>
            <h2 className='text-primary text-center mb-3'>Please Login</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Control ref={emailRef} type="email" placeholder="Enter email" required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Control ref={passwordRef} type="password" placeholder="Password" required />
                </Form.Group>
                <Button className='d-block mx-auto w-100' variant="primary" type="submit">
                    Login
                </Button>
            </Form>
            <p className='my-2'>{errorElement}</p>
            <p className='my-1'>Are you new to Genius Car? <Link to='/register' className='text-primary text-decoration-none' onClick={navigateToRegister}>Please Register</Link></p>
            <p className='my-1'>Forget Password? <button className='btn btn-link text-primary text-decoration-none' onClick={resetPassword}>Reset Password</button></p>
            <SocialLogin></SocialLogin>
        </div>
    );
};

export default Login;