export interface IError {
    statusCode: number;
    message: string;
    traceId: string | null;
}