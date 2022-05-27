export class ValidationException extends Error {
    public readonly code: string = 'PayloadValidation';
    public extra: any;
    constructor(message?: string, extra?: any) {
        super(message);
        this.extra = extra;
        Object.setPrototypeOf(this, ValidationException.prototype);
    }
}

export class BusinessException extends Error {
    public readonly code: string = 'BusinessValidation';
    constructor(message?: string) {
        super(message);
    }
}