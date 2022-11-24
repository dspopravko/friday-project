import React from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import {Login} from "../pages/authentication/login/Login";
import {PasswordNew} from "../pages/authentication/passwordNew/PasswordNew";
import {LoginWrapper} from "../pages/authentication/LoginWrapper";
import {Profile} from "../pages/profile/Profile";
import {Error404} from "../pages/error404/Error404";
import {Registration} from "../pages/authentication/registration/Registration";
import {PasswordRestore} from "../pages/authentication/passwordRestore/PasswordRestore";
import {Test} from "../pages/test/Test";
import {PATH} from "../data/paths";

export const Pages = () => {
    return (
        <Routes>
            <Route path={''} element={<Navigate to={PATH.PROFILE}/>}/>
            <Route path={PATH.LOGIN.MAIN} element={<LoginWrapper/>}>
                <Route index element={<Login/>}/>
                <Route path={PATH.LOGIN.NEWPASSWORD} element={<PasswordNew/>}/>
                <Route path={PATH.LOGIN.RESTORE} element={<PasswordRestore/>}/>
                <Route path={PATH.LOGIN.REGISTRATION} element={<Registration/>}/>
            </Route>
            <Route path={PATH.PROFILE} element={<Profile/>}/>
            <Route path={PATH.TESTS} element={<Test/>}/>

            <Route path={'*'} element={<Error404/>}/>
        </Routes>
    );
}