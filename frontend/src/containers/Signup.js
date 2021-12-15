/**
 * So the signup flow will look something like this:

The user types in their email, password, and confirms their password.

We sign them up with Amazon Cognito using the AWS Amplify library and get a user object in return.

We then render a form to accept the confirmation code that AWS Cognito has emailed to them.

We confirm the sign up by sending the confirmation code to AWS Cognito.

We authenticate the newly created user.

Finally, we update the app state with the session.

So let’s get started by creating the basic sign up form first.

 */

import React, {useState} from 'react';
import Form from "react-bootstrap/Form";
import { useNavigate } from 'react-router-dom';
import LoaderButton from '../components/LoaderButton';
import { useAppContext } from '../lib/contextLib';
import useFormFields from '../lib/hooksLib';
import { onError } from '../lib/errorLib';
import { Auth } from 'aws-amplify';
import "./Signup.css";

/**Signs a user up */
const Signup = (props) => {
    console.log(props)
    const [fields, handleFieldChange] = useFormFields({email: props.email? props.email : "", password:"", confirmPassword:"", confirmationCode: ""})
    const Navigate = useNavigate();
    const [newUser, setNewUser] = useState(null);
    const {userHasAuthenticated} = useAppContext();
    const [isLoading, setIsLoading] = useState(false);

    const valdiateForm = () => (fields.email.length > 0
                                && fields.password.length > 0
                                && fields.password === fields.confirmPassword)
    
    const validateConfirmationForm = () => fields.confirmationCode.length > 0;

    async function handleSubmit (event) {
        event.preventDefault();
        setIsLoading(true);
        try {
            const newUser = await Auth.signUp({
                username: fields.email,
                password: fields.password,
            })
            setIsLoading(false);
            setNewUser(newUser)
        } catch (e) { 
            console.log(e.name)
            onError(e);
            setIsLoading(false)
        }
    }

    async function handleConfirmationSubmit(event) {
        event.preventDefault();
        setIsLoading(true);
        try {
            await Auth.confirmSignUp(fields.email, fields.confirmationCode)
            await Auth.signIn(fields.email, fields.password);
            userHasAuthenticated(true);
            Navigate("/")
        } catch(e) {
            
            onError(e);
            setIsLoading(false);
        }
    }
    
    const renderConfirmationForm = () => (
        <Form onSubmit={handleConfirmationSubmit}>
            <Form.Group controlId="confirmationCode" size="lg">
                <Form.Label>Confirmation Code</Form.Label>
                <Form.Control 
                    autoFocus
                    type="tel"
                    onChange={handleFieldChange}
                    value={fields.confirmationCode}
                />
                <Form.Text muted>Check your email for code.</Form.Text>
            </Form.Group>
            <LoaderButton
                block
                size="lg"
                type="submit"
                variant="success"
                isLoading={isLoading}
                disabled={!validateConfirmationForm()}
                >
                Verify
            </LoaderButton>
        </Form>
    );

    const renderForm = () => (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="email" size="lg">
                <Form.Label>Email</Form.Label>
                <Form.Control
                    autoFocus
                    type="email"
                    value={fields.email}
                    onChange={handleFieldChange}
                    />
            </Form.Group>
            <Form.Group controlId="password" size="lg">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type="password"
                    value={fields.password}
                    onChange={handleFieldChange}
                    />
            </Form.Group>
            <Form.Group controlId="confirmPassword" size="lg">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                    type="password"
                    value={fields.confirmPassword}
                    onChange={handleFieldChange}
                    />
            </Form.Group>
            <LoaderButton
                block
                size="lg"
                type="submit"
                variant="success"
                isLoading={isLoading}
                disabled={!valdiateForm()}
                >
                Sign up
            </LoaderButton>
        </Form>
    );
    
    return (
        <div className='Signup'>
            {console.log(this)}
            {console.log(Object.entries(props).length)}
            {(newUser === null && Object.entries(props).length === 0) ? renderForm() : renderConfirmationForm()}
        </div>
    );

}

export default Signup;