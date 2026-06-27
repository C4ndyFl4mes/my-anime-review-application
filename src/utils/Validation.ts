import * as Yup from "yup";
import type { ISignUpReq } from "../interfaces/requests/ISignUpReq";
import type { IFieldErrors } from "../interfaces/responses/IValidationError";
import type { ISignInReq } from "../interfaces/requests/ISignInReq";

// This class provides validation methods for user authentication forms.
export class Validation {
    static signUpSchema = Yup.object({
        username: Yup.string().required("Username is required.").min(3, "Username must be at least 3 characters.").max(28, "Username must not be larger than 28 characters."),
        email: Yup.string().required("Email is required.").email("Email must be a valid email format."),
        password: Yup.string().required("Password is required.").min(16, "Password must be at least 16 characters").matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/, "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character")
    });

    static signInSchema = Yup.object({
        email: Yup.string().required("Email is required.").email("Email must be a valid email format."),
        password: Yup.string().required("Password is required.").min(16, "Password must be at least 16 characters").matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/, "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character")
    });

    static async validateSignUp(fields: ISignUpReq): Promise<IFieldErrors> {
        try {
            await this.signUpSchema.validate(fields, { abortEarly: false });
            return {};
        } catch (errors: unknown) {
            const fieldErrors: IFieldErrors = {};
            if (errors instanceof Yup.ValidationError)
                errors.inner.forEach(error => fieldErrors[error.path!] = error.message);
            
            return fieldErrors;
        }
    }

    static async validateSignIn(fields: ISignInReq): Promise<IFieldErrors> {
        try {
            await this.signInSchema.validate(fields, { abortEarly: false });
            return {};
        } catch (errors: unknown) {
            const fieldErrors: IFieldErrors = {};
            if (errors instanceof Yup.ValidationError)
                errors.inner.forEach(error => fieldErrors[error.path!] = error.message);
            
            return fieldErrors;
        }
    }
}