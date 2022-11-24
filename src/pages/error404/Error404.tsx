import React, {useContext, useEffect} from 'react';
import {HeaderTitleContext} from "../../context/context";
import s from "./Error404.module.css"

export const Error404 = () => {
    const {setTitle} = useContext(HeaderTitleContext);
    useEffect(() => {
        setTitle('💃')
    }, [])
    return (
        <div className="pageContainer">
            <div className={s.container}>

            <h1>Error 404</h1>

            Page not found
               <span style={{fontSize: "36px", padding: '20px'}}>👨‍🔧</span>

            </div>
        </div>
    );
}