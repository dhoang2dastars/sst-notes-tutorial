import React, {useState} from 'react';
import {API} from 'aws-amplify';
import { useNavigate } from 'react-router-dom';
import { onError } from '../lib/errorLib';
import config from '../config';
import {loadStripe} from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js';
import BillingForm from '../components/BillingForm';
import "./Settings.css";

const Settings = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const stripePromise = loadStripe(config.STRIPE_KEY);

    const billUser = (details) => {
        return API.post("notes", "/billing", {body:details})
    }
    const handleFormSubmit = async (storage, {token, error}) => {
        console.log("clicked");
        if(error){
            onError(error);
            return;
        }
        setIsLoading(true);
        try {
            await billUser({storage, source:token.id});
            alert("ya just got scamaz'd");
            navigate("/");
        } catch (e) {
            onError(e);
            setIsLoading(false);
        }
    }
    return (
        <div className="Settings">
        <Elements
            stripe={stripePromise}
            // fonts={[{cssSrc:"https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700,800",}]}
        >
            <BillingForm isLoading={isLoading} onSubmit={handleFormSubmit} />
        </Elements>
        </div>
    );
}
export default Settings;