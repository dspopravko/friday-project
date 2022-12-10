import React, {ReactNode} from 'react';
import {Header} from "./Header/Header";
import {Footer} from "./Footer/Footer";
import {ErrorSnackbar} from "../common/errorSnackbar/ErrorSnackbar";

type LayoutPropsType = {
    children: ReactNode
}

export const Layout = (props: LayoutPropsType) => {
    return (
        <>
            <ErrorSnackbar/>
            <Header/>
            <div>{props.children}</div>
            <Footer/>
        </>
    );
}