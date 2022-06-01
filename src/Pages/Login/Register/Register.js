import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import {
  useCreateUserWithEmailAndPassword,
  useUpdateProfile,
} from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import auth from "../../../firebase.init";
import useToken from "../../Hooks/useToken";
import SocialLogin from "../SocialLogin/SocialLogin";
import Loading from './../../Shared/Loading/Loading';

const Register = () => {
  const [agree, setAgree] = useState(false);
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth, { sendEmailVerification: true });
  const [updateProfile, updating, updateError] = useUpdateProfile(auth);
  const [token]=useToken(user);
  const navigate = useNavigate();

  const navigateToLogin = (event) => {
    navigate("/login");
  };
  if (loading || updating) {
    return <Loading></Loading>
}
  if (token) {
    navigate('/home');
  }
  const handleRegister = async (event) => {
    event.preventDefault();
    const name = event.target.name.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
    // console.log(name, email, password);

    await createUserWithEmailAndPassword(email, password);
    await updateProfile({ displayName: name });
    console.log("Updated profile");
  };
  return (
    <div className="container mx-auto w-50 my-5 pt-4">
      <h2 className="text-primary text-center pb-3">Please Register</h2>
      <Form onSubmit={handleRegister}>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Control type="text" name="name" placeholder="Enter Name" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control
            type="email"
            name="email"
            placeholder="Enter email"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Control
            type="password"
            name="password"
            placeholder="Password"
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check
            onClick={() => setAgree(!agree)}
            className={agree ? "text-primary" : "text-danger"}
            type="checkbox"
            name="terms"
            label="Accepts genius car terms and condition."
          />
        </Form.Group>
        <Button
          disabled={!agree}
          className="d-block mx-auto w-100"
          variant="primary"
          type="submit"
        >
          Register
        </Button>
      </Form>
      <p className="my-1">
        Already have an account?{" "}
        <Link
          to="/login"
          onClick={navigateToLogin}
          className="text-primary text-decoration-none"
        >
          Login
        </Link>
      </p>
      <SocialLogin></SocialLogin>
    </div>
  );
};

export default Register;
