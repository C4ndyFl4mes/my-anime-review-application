import { useEffect } from "react";
import type { IError } from "../interfaces/responses/IError"
import type { IRefreshRes } from "../interfaces/responses/IRefreshRes"
import AuthService from "../services/AuthService"
import AuthenticationStore from "../stores/AuthenticationStore";
import GlobalMessageStore from "../stores/GlobalMessageStore";

// This component is responsible for refreshing the authentication token at regular intervals to keep the user logged in.
export default function RefreshToken() {
    const refreshToken = async () => {
        const res: IRefreshRes | IError = await AuthService.RefreshToken();

        if ((res as IError).statusCode) {
            AuthenticationStore.clearState();
            if ((res as IError).statusCode != 401) {
                GlobalMessageStore.setMessage((res as IError).message, (res as IError).statusCode);
            }
        } else {
            AuthenticationStore.setState({
                userId: (res as IRefreshRes).userId,
                isAdmin: (res as IRefreshRes).isAdmin
            });
        }
    }

    useEffect(() => {
        refreshToken();

        const timer = setInterval(refreshToken, 7 * 60 * 1000); // Refresh token every 7 minutes
        return () => clearInterval(timer);
    }, []);

    return null;
}