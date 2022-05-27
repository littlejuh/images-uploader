jest.mock('serverless-http');

import * as express from 'express';
import { ErrorHandler } from '../../../src/infrastructure/server-error-handler';
import { mockMethod } from '../../mock-util';
import { Container } from 'typescript-ioc';
import { Logger } from 'typescript-loggable';
import {
    BusinessException,
    ValidationException
} from '../../../src/domain/errors';
import { Snapshot } from 'typescript-ioc/dist/model';

let mockLoggerError: jest.Mock;
const mockRequest = jest.fn();
const mockNext = jest.fn();
const mockResponse = {
    headersSent: false,
    status: jest.fn(),
    json: jest.fn(),
};

let errorMiddleware: (
    error: any,
    _req: express.Request,
    res: express.Response,
    next: express.NextFunction
) => void;

describe('Server Error Handler', () => {
    describe('getMiddleware', () => {
        let snapshot: Snapshot;

        beforeEach(() => {
            snapshot = Container.snapshot(ErrorHandler);
            mockLoggerError = mockMethod(Logger, 'error');
            const errorHandler = Container.get(ErrorHandler);
            errorMiddleware = errorHandler.getMiddleware();
            mockResponse.status.mockReturnValue(mockResponse);
            mockResponse.json.mockReturnValue(mockResponse);
            mockNext.mockClear();
            mockResponse.status.mockClear();
            mockResponse.json.mockClear();
            mockResponse.headersSent = false;
        });

        afterEach(() => {
            snapshot.restore();
        });

        it('should do nothing and call next if the headers are already sent', () => {
            const error = new Error();
            mockResponse.headersSent = true;
            mockNext.mockReturnValue('any value');

            expect(
                errorMiddleware(
                    error,
                    mockRequest as any,
                    mockResponse as any,
                    mockNext
                )
            ).toEqual('any value');
            expect(mockNext).toBeCalledTimes(1);
            expect(mockNext).toBeCalledWith(error);
        });

        it('should sent 400 for validation exceptions', () => {
            checkError(new ValidationException('test message validation'), 400);
        });

        it('should sent 403 for business exceptions', () => {
            checkError(new BusinessException('test message validation'), 403);
        });

        it('should sent 500 other exceptions', () => {
            checkError(
                new Error('test message unexpected'),
                500,
                'Internal Error'
            );
        });

        it('should do nothing and call next if error is null', () => {
            errorMiddleware(
                null,
                mockRequest as any,
                mockResponse as any,
                mockNext
            );
            expect(mockNext).toBeCalledTimes(1);
            expect(mockNext).toBeCalledWith(null);
            expect(mockLoggerError).toBeCalledTimes(0);
        });
    });
});

const checkError = (error: any, status: number, errorMessage?: string) => {
    errorMiddleware(error, mockRequest as any, mockResponse as any, mockNext);
    expect(mockResponse.status).toBeCalledWith(status);
    expect(mockResponse.json).toBeCalledWith({
        code: error.code ? error.code : 'Unknown',
        message: errorMessage ? errorMessage : error.message,
    });
    expect(mockLoggerError).toBeCalledWith(`Error:`, error);
};