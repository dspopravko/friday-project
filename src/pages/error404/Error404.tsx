import React, {useContext, useEffect} from 'react';
import {HeaderTitleContext} from "../../context/context";
import s from "./Error404.module.css"

export const Error404 = () => {
    const {setTitle} = useContext(HeaderTitleContext);
    useEffect(() => {
        setTitle('💃')
    }, [])
    return (
        <div>
            <h1>Error 404!</h1>
            Page not found
        </div>
    );
}