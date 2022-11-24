import React, {useContext} from 'react';
import s from './Header.module.css'
import {HeaderTitleContext} from "../../context/context";
import XButton from "../../components/button/XButton";

type HeaderPropsType = {
    handleOpen: () => void
}

export const Header = (props: HeaderPropsType) => {
    const {title} = useContext(HeaderTitleContext);
    return (
        <div className={s.header}>
            <div className={s.buttonContainer}>
                <XButton onClick={props.handleOpen}> Open</XButton>
                <div className={s.titleContainer}>
                    {title || 'Loading...'}

                </div>
            </div>
        </div>
    );
}