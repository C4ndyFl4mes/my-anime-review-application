import Axios from "axios";
import type { ISignUpReq } from "../interfaces/requests/ISignUpReq";
import type { IAuthRes } from "../interfaces/responses/IAuthRes";
import type { IValidationError } from "../interfaces/responses/IValidationError";
import type { IError } from "../interfaces/responses/IError";
import { ResponseHandler } from "../utils/ResponseHandler";
import type { ISignInReq } from "../interfaces/requests/ISignInReq";
import type { IRefreshRes } from "../interfaces/responses/IRefreshRes";

// This service handles user authentication by providing methods for user authentication.
class AuthService {
    private resHandler = new ResponseHandler();
    private client = Axios.create({
        baseURL: 'https://localhost:8443/api/user',
        withCredentials: true
    });
    private config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    async SignUp(credentials: ISignUpReq): Promise<IAuthRes | IValidationError | IError> {
        try {
            return this.resHandler.Success<IAuthRes>(
                await this.client.post<IAuthRes>("/signup", credentials, this.config)
            );
        } catch (e: unknown) {
            return this.resHandler.Failure(e);
        }
    }

    async SignIn(credentials: ISignInReq): Promise<IAuthRes | IValidationError | IError> {
        try {
            return this.resHandler.Success<IAuthRes>(
                await this.client.post<IAuthRes>("/signin", credentials, this.config)
            );
        } catch (e: unknown) {
            return this.resHandler.Failure(e);
        }
    }

    async IsAuthenticated(): Promise<IAuthRes | IError> {
        try {
            return this.resHandler.Success<IAuthRes>(
                await this.client.get<IAuthRes>("/is-authenticated", this.config)
            );
        } catch (e: unknown) {
            return this.resHandler.Failure(e);
        }
    }

    async RefreshToken(): Promise<IRefreshRes | IError> {
        try {
            return this.resHandler.Success<IRefreshRes>(
                await this.client.post<IRefreshRes>("/refresh", {}, this.config)
            );
        } catch (e: unknown) {
            return this.resHandler.Failure(e);
        }
    }
}

export default new AuthService();