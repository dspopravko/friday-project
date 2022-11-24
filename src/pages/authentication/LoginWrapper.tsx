import React, {useContext, useEffect} from 'react';
import {Outlet} from "react-router-dom";
import {HeaderTitleContext} from "../../context/context";
import {setPageTitle} from "../../services/pageTitle";
import {useAppSelector} from "../../state/Store";
import s from "./LoginWrapper.module.css"

export const LoginWrapper = () => {
    const {setTitle} = useContext(HeaderTitleContext);
    const isAuth = useAppSelector(state => state.auth.isAuth)

    useEffect(() => {
        setTitle('Login page')
        setPageTitle('Login');
    }, [])
    return (
        <div className="pageContainer">
            <div className={s.loginWrapper}>
                <div className={s.heading}>
                    Login wrapper

                </div>
                Some mock state from redux "isAuth : {isAuth ? 'True' : 'False'}". Passing through the context to the outlet 👇
            </div>
                <Outlet context={{isAuth: isAuth}}/>
        </div>
    );
}