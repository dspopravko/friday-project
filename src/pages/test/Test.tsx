import React, {useContext, useEffect} from 'react';
import XButton from "../../common/components/button/XButton";
import {HeaderTitleContext} from "../../context/context";
import XInput from "../../common/components/input/XInput";
import s from "./Test.module.css"
import XSelect from "../../common/components/select/XSelect";
import XRadio from "../../common/components/radio/XRadio";
import {mockSelect} from "../../data/selectOptions";
import {setPageTitle} from "../../services/pageTitle";

export const Test = () => {
    const {setTitle} = useContext(HeaderTitleContext);
    useEffect(() => {
        setTitle('Testing components page')
        setPageTitle('Tests');
    }, [])

    const alertHandler = () => alert('🏄‍')

    return (
        <div className="pageContainer">
            <h1 style={{margin: "20px 0"}}>Here are the template components:</h1>
            <hr/>
            <div className={s.container}>
                <div className={s.item}>
                    Buttons:
                    <XButton onClick={alertHandler}>Some button</XButton>
                    <XButton onClick={alertHandler} disabled>Disabled button</XButton>
                    <XButton onClick={alertHandler} xType={'secondary'}>Sec button</XButton>
                </div>
                <div className={s.item}>
                    Input: (without logic)
                    <XInput
                        onEnter={alertHandler}
                    />
                </div>
                <div className={s.item}>
                    Select: (without logic)
                    <XSelect
                        options={mockSelect}
                    />
                </div>
                <div className={s.item}>
                    Radio: (without logic)
                    <XRadio
                        value={1}
                        options={mockSelect}
                    />
                </div>
            </div>
        </div>
    );
}