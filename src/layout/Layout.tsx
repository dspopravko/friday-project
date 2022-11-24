import React, {ReactNode, useEffect, useState} from 'react';
import {Sidebar} from "./Sidebar/Sidebar";
import {Header} from "./Header/Header";

type LayoutPropsType = {
    children: ReactNode
}

export const Layout = (props: LayoutPropsType) => {
    const [open, setOpen] = useState(false)
    const handleClose = () => setOpen(false)
    const handleOpen = () => setOpen(true)

    useEffect(() => {
        open && (document.body.style.overflow = 'hidden')
        !open && (document.body.style.overflow = 'initial')
    }, [open])

    return (
        <div>
            <Sidebar open={open} handleClose={handleClose}/>
            <Header handleOpen={handleOpen}/>
            <div>{props.children}</div>
        </div>
    );
}