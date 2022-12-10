import React, {useContext, useEffect} from 'react';
import {HeaderTitleContext} from "../../../../context/context";

export const PasswordNew = () => {
    const {setTitle} = useContext(HeaderTitleContext);
    useEffect(() => {
        setTitle('Login page: new password')
    }, [])
    return (
        <div>NewPassword</div>
    );
}