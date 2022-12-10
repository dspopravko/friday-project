import React, {useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../state/store";
import {Button, Typography} from "@mui/material";
import {logout} from "../../features/auth/authSlice";

export const ProfileSmall = () => {
    const [open, setOpen] = useState(false)
    const dispatch = useAppDispatch()
    const user = useAppSelector(state => state.auth.user)
        return (
        <div style={{display: "flex", alignItems: "center"}}>
            <div onClick={()=> setOpen(!open)} style={{cursor: "pointer"}}>
                <Typography
                    style={{userSelect: "none"}}
                    variant={"h6"}
                >
                    {user.name}
                </Typography>
            </div>

            {
                open && <div style={{position: "absolute", transform: "translate(-20px, 46px)"}}>
                    <Button variant={"contained"} onClick={()=> dispatch(logout())}>Logout</Button>
                </div>
            }

        </div>
    );
}