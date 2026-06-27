import { useState } from "react";
import type { ISignUpReq } from "../interfaces/requests/ISignUpReq";
import type { ISignInReq } from "../interfaces/requests/ISignInReq";
import type { IAuthRes } from "../interfaces/responses/IAuthRes";
import AuthService from "../services/AuthService";
import type { IFieldErrors, IValidationError } from "../interfaces/responses/IValidationError";
import type { IError } from "../interfaces/responses/IError";
import { Validation } from "../utils/Validation";
import GlobalMessageStore from "../stores/GlobalMessageStore";

// This page is responsible for handling user authentication, including sign-in and sign-up functionalities. It provides a form for users to enter their credentials and handles validation and API requests.
export default function AuthenticationPage() {
    const [formOption, setFormOption] = useState(true);
    const [fieldErrors, setFieldErrors] = useState<IFieldErrors>({});
    const [apiError, setApiError] = useState<IError | null>(null);
    const spanText: Array<string> = ["Already have an account?", "Have no account?"];
    const btnText: Array<string> = ["Sign in", "Sign up"];
    const [signUpCredentials, setSignUpCredentials] = useState<ISignUpReq>({
        username: "",
        email: "",
        password: ""
    });
    const [signInCredentials, setSignInCredentials] = useState<ISignInReq>({
        email: "",
        password: ""
    });

    // Function to handle authentication (sign in or sign up) based on the form option.
    async function authenticate() {
        const errors: IFieldErrors = formOption ? await Validation.validateSignIn(signInCredentials) : await Validation.validateSignUp(signUpCredentials);
        setFieldErrors(errors);

        if (Object.keys(errors).length === 0) {
            const res: IAuthRes | IValidationError | IError = formOption ? await AuthService.SignIn(signInCredentials) : await AuthService.SignUp(signUpCredentials);

            if ((res as IAuthRes).isAuthenticated) {
               GlobalMessageStore.setMessage("Authentication successful.", 200);
            }

            if ((res as IError)?.statusCode) {
                setApiError((res as IError));
            }
        }
    }

    return (
        <div className="w-100 max-w-screen flex flex-col mx-auto">
            <label className="ms-auto flex gap-x-2 text-sm mr-1">
                <span>{spanText[formOption ? 1 : 0]}</span>
                <button className="underline font-bold" onClick={() => { setFormOption(fo => fo = !fo); setFieldErrors({}); }}>{btnText[formOption ? 1 : 0]}</button>
            </label>
            <form className="tertiary-bg-color rounded-lg p-2">
                <fieldset className="flex flex-col gap-y-5">
                    <legend className="font-bold text-xl mb-5">{btnText[formOption ? 0 : 1]}</legend>
                    {formOption ? <SignInFields signInCredentials={signInCredentials} setSignInCredentials={setSignInCredentials} fieldErrors={fieldErrors} /> : <SignUpFields signUpCredentials={signUpCredentials} setSignUpCredentials={setSignUpCredentials} fieldErrors={fieldErrors} />}
                    <button type="button" className="cursor-pointer self-center w-50 py-2 mt-10 mb-5 accept-button-bg-color rounded-md" onClick={() => { setApiError(null); authenticate(); }}>{btnText[formOption ? 0 : 1]}</button>
                    {(apiError) && (
                        <span className="validation-error text-center">{apiError.message}</span>
                    )}
                </fieldset>
            </form>
        </div>
    );
}

function SignInFields({ signInCredentials, setSignInCredentials, fieldErrors }: { signInCredentials: ISignInReq; setSignInCredentials: (credentials: ISignInReq) => void; fieldErrors: IFieldErrors; }) {
    return (
        <>
            <div className="field-group">
                <label htmlFor="email-field">Email</label>
                <input type="email" value={signInCredentials.email} onChange={(e) => setSignInCredentials({ ...signInCredentials, email: e.target.value })} id="email-field" name="email" autoComplete="current-email" />
                {fieldErrors.email && (
                    <span className="validation-error">{fieldErrors.email}</span>
                )}
            </div>
            <div className="field-group">
                <label htmlFor="password-field">Password</label>
                <input type="password" value={signInCredentials.password} onChange={(e) => setSignInCredentials({ ...signInCredentials, password: e.target.value })} id="password-field" name="password" autoComplete="current-password" />
                {fieldErrors.password && (
                    <span className="validation-error">{fieldErrors.password}</span>
                )}
            </div>
        </>
    );
}

function SignUpFields({ signUpCredentials, setSignUpCredentials, fieldErrors }: { signUpCredentials: ISignUpReq; setSignUpCredentials: (credentials: ISignUpReq) => void; fieldErrors: IFieldErrors }) {
    return (
        <>
            <div className="field-group">
                <label htmlFor="username-field">Username</label>
                <input type="text" value={signUpCredentials.username} onChange={(e) => setSignUpCredentials({ ...signUpCredentials, username: e.target.value })} id="username-field" name="username" />
                {fieldErrors.username && (
                    <span className="validation-error">{fieldErrors.username}</span>
                )}
            </div>
            <div className="field-group">
                <label htmlFor="email-field">Email</label>
                <input type="email" value={signUpCredentials.email} onChange={(e) => setSignUpCredentials({ ...signUpCredentials, email: e.target.value })} id="email-field" name="email" autoComplete="current-email" />
                {fieldErrors.email && (
                    <span className="validation-error">{fieldErrors.email}</span>
                )}
            </div>
            <div className="field-group">
                <label htmlFor="password-field">Password</label>
                <input type="password" value={signUpCredentials.password} onChange={(e) => setSignUpCredentials({ ...signUpCredentials, password: e.target.value })} id="password-field" name="password" autoComplete="current-password" />
                {fieldErrors.password && (
                    <span className="validation-error">{fieldErrors.password}</span>
                )}
            </div>
        </>
    );
}