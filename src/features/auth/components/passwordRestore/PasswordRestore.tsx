import React, {useContext, useEffect} from 'react';
import {HeaderTitleContext} from "../../../../context/context";

export const PasswordRestore = () => {
    const {setTitle} = useContext(HeaderTitleContext);
    useEffect(() => {
        setTitle('Login page: restore password')
    }, [])
    return (
        <div>
            RestorePassword
        </div>
    );
}