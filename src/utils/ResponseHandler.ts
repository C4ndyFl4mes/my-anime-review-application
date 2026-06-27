import type { AxiosError, AxiosResponse } from "axios";
import type { IError } from "../interfaces/responses/IError";
import type { IValidationError } from "../interfaces/responses/IValidationError";

// This class handles the responses from Axios requests, providing methods to process successful responses and handle errors appropriately.
export class ResponseHandler {
    Success<T>(res: AxiosResponse<T>): T {
        if (res.status >= 200 && res.status < 300) {
            return res.data;
        }
        throw new Error(`Unexpected status: ${res.status}.`);
    }

    Failure(error: unknown): IError | IValidationError {
        let axerror = error as AxiosError;

        if (!axerror.isAxiosError) {
            return {
                statusCode: 500,
                message: "The error wasn't Axios error."
            } as IError;
        }

        const errorRes: IError | IValidationError = axerror.response?.data as IError | IValidationError;

        let validationError: IValidationError;

        if (errorRes.statusCode == 400) {
            validationError = errorRes as IValidationError;
            return validationError;
        } else {
            return errorRes;
        }
    }
}