import { flow, makeAutoObservable } from "mobx";
import type { IAuthRes } from "../interfaces/responses/IAuthRes";
import type { IError } from "../interfaces/responses/IError";
import AuthService from "../services/AuthService";
import GlobalMessageStore from "./GlobalMessageStore";

class AuthenticationStore {
    authState: IAuthRes | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    setState(authState: IAuthRes) {
        this.authState = authState;
    }

    clearState() {
        this.authState = null;
    }

    getCurrentState = flow(function* (this: AuthenticationStore) {
        const res: IAuthRes | IError = yield AuthService.IsAuthenticated();
        if ((res as IError).statusCode)
        {
            this.authState = null;
            GlobalMessageStore.setMessage((res as IError).message, (res as IError).statusCode);
        } else {
            this.authState = (res as IAuthRes);
        }
    });
}

export default new AuthenticationStore();