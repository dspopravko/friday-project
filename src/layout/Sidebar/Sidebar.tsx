import React from 'react';
import {NavLink} from "react-router-dom";
import {PATH} from "../../data/paths";
import s from "./Sidebar.module.css"

type SidebarPropsType = {
    open: boolean
    handleClose: () => void
}

export const Sidebar = ({open, handleClose}: SidebarPropsType) => {
    const sidebarClass = open ? `${s.sidebar} ${s.open}` : s.sidebar
    const activeColor = "var(--link-color)"
    const color = "var(--text-color)"

    return (
        <div>
            {open && <div className={s.background} onClick={handleClose}/>}

            <aside className={sidebarClass}>
                <button className={s.close} onClick={handleClose}>
                    <img
                        alt="close sidebar"
                    ></img>
                </button>

                <nav className={s.nav}>
                    Links to all pages👇
                    <NavLink
                        to={PATH.LOGIN.MAIN}
                        onClick={handleClose}
                        style={({ isActive }) => ({ color: isActive ? activeColor : color })}
                        end
                    >Login Page
                    </NavLink>

                    <NavLink
                        to={`${PATH.LOGIN.MAIN}/${PATH.LOGIN.REGISTRATION}`}
                        onClick={handleClose}
                        style={({ isActive }) => ({ color: isActive ? activeColor : color })}
                    >Registration
                    </NavLink>

                    <NavLink
                        replace
                        to={PATH.LOGIN.MAIN + "/" + PATH.LOGIN.RESTORE}
                        onClick={handleClose}
                        style={({ isActive }) => ({ color: isActive ? activeColor : color })}
                    >Restore password
                    </NavLink>

                    <NavLink
                        replace
                        to={PATH.LOGIN.MAIN + "/" + PATH.LOGIN.NEWPASSWORD}
                        onClick={handleClose}
                        style={({ isActive }) => ({ color: isActive ? activeColor : color })}
                    >
                        New password
                    </NavLink>

                    <NavLink
                        to={PATH.TESTS}
                        onClick={handleClose}
                        style={({ isActive }) => ({ color: isActive ? activeColor : color })}
                    >
                        Tests
                    </NavLink>

                    <NavLink
                        to={PATH.PROFILE}
                        onClick={handleClose}
                        style={({ isActive }) => ({ color: isActive ? activeColor : color })}
                    >
                        Profile
                    </NavLink>
                </nav>
            </aside>
        </div>
    )
}