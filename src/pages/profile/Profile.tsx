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
        <div>
            Profile
        </div>
    );
}