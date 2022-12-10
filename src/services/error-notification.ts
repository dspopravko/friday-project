import {appSlice, appStatus} from "../state/appSlice";
import {Dispatch} from "@reduxjs/toolkit";

export const handleServerAppError = (data: {error: string}, dispatch: Dispatch) => {

    if (data.error) {
        dispatch(appSlice.actions.setAppError({error: data.error}))
    } else {
        dispatch(appSlice.actions.setAppError({error: 'Some error occurred'}))
    }
    dispatch(appSlice.actions.setAppStatus({status: appStatus.idle}))
}

export const handleServerNetworkError = (error: { message: string }, dispatch: Dispatch) => {
    dispatch(appSlice.actions.setAppError({error: error.message}))
    dispatch(appSlice.actions.setAppStatus({status: appStatus.idle}))
}