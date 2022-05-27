import { Container, Snapshot } from 'typescript-ioc';
import { Server } from '../../../src/infrastructure/server';
import { mockMethod } from '../../mock-util';
import { APRcalculatorController } from '../../../src/controllers/apr-calculator-controller';

let mockConfigureServer: jest.Mock;

describe('Index interfaces', () => {

    let snapshot: Snapshot;

    beforeAll(() => {
        snapshot = Container.snapshot(Server);
        mockConfigureServer = mockMethod(Server, 'configureServer');
    });

    afterAll(() => {
        snapshot.restore();
    });

    beforeEach(() => {
        mockConfigureServer.mockClear();
    });

    describe('index', () => {
        it('configure the rest server', () => {
            const server = { test: 'server' };
            mockConfigureServer.mockReturnValue(server);
            const index = require('../../../src/interfaces/index');
            expect(index.handler).toStrictEqual(server);
            expect(mockConfigureServer).toBeCalledTimes(1);
            expect(mockConfigureServer).toBeCalledWith([APRcalculatorController]);
        });
    });
});