jest.mock('serverless-http');

import * as express from 'express';
import * as serverless from 'serverless-http';
import { Container, Snapshot } from 'typescript-ioc';
import { Server as RestServer } from 'typescript-rest';
import { Server } from '../../../src/infrastructure/server'

describe('Server', () => {
    const isImmutable = jest.fn();
    const mockServerless: jest.Mock = serverless as any;

    let snapshot: Snapshot;

    const useMock = jest.fn();
    const app = {
        use: useMock
    } as any as express.Application;

    beforeAll(() => {
        snapshot = Container.snapshot(Server);
    })

    beforeEach(() => {
        RestServer.isImmutable = isImmutable.bind(RestServer);
        RestServer.immutable = jest.fn().mockImplementation(i => i);
        RestServer.buildServices = jest.fn();
    });

    afterAll(() => {
        snapshot.restore();
    });

    it('should not execute configuration when isImutable Property is true', () => {
        isImmutable.mockReturnValue(true);

        const server: Server = new Server(app);

        server.configureServer([]);

        expect(RestServer.isImmutable).toBeTruthy();
        expect(RestServer.immutable).not.toBeCalled();
    });

    it('should execute configuration when isImutable Property is false', () => {
        isImmutable.mockReturnValueOnce(false);

        const server: Server = new Server(app);

        server.configureServer([]);

        expect(RestServer.buildServices).toBeCalledTimes(1);
        expect(RestServer.isImmutable).toBeTruthy();
        expect(RestServer.immutable).toBeCalledWith(true);
    });

    it('creates a server correctly', () => {

        isImmutable.mockReturnValue(true);
        const server: Server = new Server();

        server.configureServer([]);

        expect(mockServerless).toBeCalledWith(RestServer.server());
    });
});