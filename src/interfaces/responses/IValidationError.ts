export interface IValidationError {
    statusCode: number;
    message: string;
    errors: IFieldErrors;
    traceId: string | null;
}

export interface IFieldErrors {
    [key: string]: string;
}