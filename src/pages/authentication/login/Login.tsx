import React, {useContext, useEffect} from 'react';
import {useAppDispatch} from "../../../state/Store";
import XButton from "../../../components/button/XButton";
import {setAuth} from "../../../state/AuthReducer";
import {useOutletContext} from "react-router-dom";
import {HeaderTitleContext} from "../../../context/context";

export const Login = () => {
    const { isAuth } = useOutletContext<{ isAuth: boolean }>();
    const dispatch = useAppDispatch()
    const changeStateHandler = () => dispatch(setAuth(!isAuth))

    const {setTitle} = useContext(HeaderTitleContext);
    useEffect(() => {
        setTitle('Login page')
    }, [])
    return (
        <div>
            Login
            <XButton
                onClick={ () => changeStateHandler() }
            >Change state!</XButton>
        </div>
    );
}