import React, {useContext, useEffect} from 'react';
import {HeaderTitleContext} from "../../../../context/context";
import {LoginForm} from "./form/LoginForm";

export const Login = () => {
    const {setTitle} = useContext(HeaderTitleContext);
    useEffect(() => {
        setTitle('Login page')
    }, [])

    return (
        <div>
            Login
            <LoginForm/>
        </div>
    );
}