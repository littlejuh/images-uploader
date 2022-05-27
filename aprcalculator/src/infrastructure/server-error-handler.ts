import * as express from 'express';
import {
    BusinessException,
    ValidationException
} from '../domain/errors';
import { Inject } from 'typescript-ioc';
import { Logger } from 'typescript-loggable';

export class ErrorHandler {
    @Inject
    private logger!: Logger;

    public getMiddleware() {
        return (error: any, _req: express.Request, res: express.Response, next: express.NextFunction) => {
            if (res.headersSent) {
                this.logger.error('Error handler, connection closed', error);
                return next(error);
            }
            if (error) {
                if (error instanceof ValidationException) {
                    res.status(400).json({ code: error.code, message: error.message});
                } else if (error instanceof BusinessException) {
                    res.status(403).json({ code: error.code, message: error.message});
                }
                else {
                    res.status(500).json({ code: 'Unknown', message: 'Internal Error'});
                }
                this.logger.error(`Error:`, error);
            } else {
                next(error);
            }
        };
    }
}