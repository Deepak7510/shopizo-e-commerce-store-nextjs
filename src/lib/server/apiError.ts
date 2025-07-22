export class ApiError extends Error {
    statusCode: number;
    success: boolean;
    data?: unknown;
    constructor(statusCode: number, message: string, data?: unknown) {
        super(message);
        this.success = false;
        this.statusCode = statusCode;
        this.data = data || null;
        Error.captureStackTrace(this, this.constructor);
    }
}
