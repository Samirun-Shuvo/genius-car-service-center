import React, { useRef } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { useSendPasswordResetEmail } from 'react-firebase-hooks/auth';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import auth from '../../../firebase.init';
import SocialLogin from '../SocialLogin/SocialLogin';

const Login = () => {
    const emailRef = useRef();
    const passwordRef = useRef('');
    const navigate = useNavigate();

    const location = useLocation();

    let errorElement;

    let from = location.state?.from?.pathname || "/";

    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useSignInWithEmailAndPassword(auth);
    if (user) {
        navigate(from, { replace: true });
    }

    if (error) {
        errorElement = <p className='text-danger'>Error: {error?.message}</p>
    }

    const handleSubmit = event => {
        event.preventDefault();
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        // console.log(email, password);
        signInWithEmailAndPassword(email, password);
    }
    const navigateToRegister = event => {
        navigate('/register');
    }
    const [sendPasswordResetEmail, sending] = useSendPasswordResetEmail(auth);
    const resetPassword = async () => {
        const email = emailRef.current.value;
        await sendPasswordResetEmail(email);
        alert('Sent email');
    }
    return (
        <div className='container mx-auto w-50 my-5 pt-4'>
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
            <p className='my-1'>Forget Password? <Link to='/register' className='text-primary text-decoration-none' onClick={resetPassword}>Reset Password</Link></p>
            <SocialLogin></SocialLogin>
        </div>
    );
};

export default Login;