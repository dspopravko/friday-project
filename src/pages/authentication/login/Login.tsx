import React, {useContext, useEffect} from 'react';
import {useAppDispatch} from "../../../state/Store";
import XButton from "../../../common/components/button/XButton";
import {setAuth} from "../../../state/AuthReducer";
import {useOutletContext} from "react-router-dom";
import {HeaderTitleContext} from "../../../context/context";
import {authApi} from "../../../features/auth/auth-api";

export const Login = () => {
    const { isAuth } = useOutletContext<{ isAuth: boolean }>();
    const dispatch = useAppDispatch()
    const changeStateHandler = () => dispatch(setAuth(!isAuth))

    const {setTitle} = useContext(HeaderTitleContext);
    useEffect(() => {
        setTitle('Login page')
    }, [])
    const authMeHandler = async () => {
        try {
        const res = await authApi.me()
        console.log(res)
        } catch (e) {
            console.log(e)
        }
    }
    const pingWithTime = async () => {
        const res = await authApi.pingWithTime(new Date().getTime())
        console.log(res)
    }
    const pingWithoutTime = async () => {
        const res = await authApi.pingWithoutTime()
        console.log(res)
    }

    return (
        <div>
            Login
            <XButton
                onClick={ () => changeStateHandler() }
            >Change state!</XButton>
            <XButton
                onClick={ () => authMeHandler() }
            >is auth?</XButton>
            <XButton
                onClick={ () => pingWithTime() }
            >pingWithTime</XButton>
            <XButton
                onClick={ () => pingWithoutTime() }
            >pingWithoutTime</XButton>
        </div>
    );
}