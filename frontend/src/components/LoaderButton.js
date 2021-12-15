import React from "react";
import Button from 'react-bootstrap/Button';
import {BsArrowRepeat} from "react-icons/bs";
import "./LoaderButton.css";


const LoaderButton = ({isLoading, 
                       className="", 
                       disabled=false, 
                       ...props}) => (
    <Button
        disabled={disabled || isLoading}
        className={'Loader Button $className'}
        {...props}
    >
        {isLoading && <BsArrowRepeat className="spinning"/>}
        {props.children}
    </Button>
)
export default LoaderButton;