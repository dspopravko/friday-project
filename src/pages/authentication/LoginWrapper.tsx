import React, {useContext, useEffect} from 'react';
import {Outlet} from "react-router-dom";
import {HeaderTitleContext} from "../../context/context";
import {setPageTitle} from "../../services/pageTitle";
import {useAppSelector} from "../../state/Store";

export const LoginWrapper = () => {
    const {setTitle} = useContext(HeaderTitleContext);
    const isAuth = useAppSelector(state => state.auth.isAuth)

    useEffect(() => {
        setTitle('Login page')
        setPageTitle('Login');
    }, [])
    return (
        <div>
            Login wrapper
            Some mock state: {isAuth ? 'True' : 'False'}
            <Outlet context={{ isAuth: isAuth }} />
        </div>
    );
}