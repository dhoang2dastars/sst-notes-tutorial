import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import {Auth} from 'aws-amplify';
import "./Login.css";
import { useAppContext } from "../lib/contextLib";
import { useNavigate } from "react-router-dom";
import LoaderButton from "../components/LoaderButton";
import { onError } from "../lib/errorLib";
import useFormFields from "../lib/hooksLib"


const Login = () => {
    const navigate = useNavigate();
    const {userHasAuthenticated} = useAppContext();
    // const [email, setEmail] = useState("");
    // const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [fields, handleFieldChange] = useFormFields({
        email:"",
        password:""
    })

    function validateForm() {
        return fields.email.length > 0 && fields.password.length > 0;
    }
    //TODO: fix the UserNotConfirmed error by redirecting them to a confirm code page. Maybe context state?
    async function handleSubmit(event) {
        event.preventDefault();
        setIsLoading(true)
        try {
            await Auth.signIn(fields.email, fields.password);
            userHasAuthenticated(true);
            navigate('/');
        } catch(e) {
            if(e.name === "UserNotConfirmedException"){
                navigate("/signup", {state:{email: fields.email}})
            }
            onError(e);

            setIsLoading(false);
        }
    }

    return (
        <div className="Login">
            <Form onSubmit={handleSubmit}>
                <Form.Group size="lg" controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        autoFocus
                        type="email"
                        value={fields.email}
                        onChange={handleFieldChange/**(e) => setEmail(e.target.value)*/}
                    />
                </Form.Group>
                <Form.Group size="lg" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        value={fields.password}
                        onChange={handleFieldChange/*(e)=> setPassword(e.target.value)*/}
                    />
                </Form.Group>
                <LoaderButton block size="lg" type="submit" isLoading={isLoading} disabled={!validateForm()}>Login</LoaderButton>
                {/* <Button block size="lg" type="submit" disabled={!validateForm()}>Login</Button> */}
            </Form>
        </div>
    );
}

export default Login;