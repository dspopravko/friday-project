import {instance} from "../../services/api";

export const authApi = {
    me() {
        return instance.post('auth/me', {})
    },
    pingWithoutTime() {
        return instance.post('ping', {})
    },
    pingWithTime(frontTime: number) {
        return instance.post('ping', {frontTime})
    }
}