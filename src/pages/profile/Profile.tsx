import React, {useContext, useEffect} from 'react';
import {HeaderTitleContext} from "../../context/context";
import {setPageTitle} from "../../services/pageTitle";

export const Profile = () => {
    const {setTitle} = useContext(HeaderTitleContext);
    useEffect(() => {
        setTitle('Profile')
        setPageTitle('Profile');
    }, [])
    return (
        <div className="pageContainer">
            <h1 style={{marginTop: '20px'}}>Profile</h1>
        </div>
    );
}