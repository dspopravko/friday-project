import React, {useContext, useEffect} from 'react';
import {HeaderTitleContext} from "../../context/context";
import {setPageTitle} from "../../services/pageTitle";
import {useAppSelector} from "../../state/store";

export const Profile = () => {
    const {setTitle} = useContext(HeaderTitleContext);
    const user = useAppSelector(state => state.auth.user);
    useEffect(() => {
        setTitle('Profile')
        setPageTitle('Profile');
    }, [])
    return (
        <div className="pageContainer">
            <h1 style={{marginTop: '20px'}}>Profile</h1>
            Username: {user.name} <br/>
            ID: {user._id}<br/>
            Email: {user.email}<br/>
            CardsCount: {user.publicCardPacksCount}<br/>
            Avatar: {user.avatar}<br/>
        </div>
    );
}