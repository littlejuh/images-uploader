import { Logger } from 'typescript-loggable';
import * as express from 'express';
import * as serverless from 'serverless-http';
import { Inject } from 'typescript-ioc';
import { Server as RestServer } from 'typescript-rest';
import { ErrorHandler } from './server-error-handler';

export class Server {
    @Inject
    private logger!: Logger;

    @Inject
    private errorHandler!: ErrorHandler;

    constructor(private app: express.Application = express()) {}

    public configureServer(services: Array<any>) {
        if (!RestServer.isImmutable()) {
            this.logger.info('Configuring Rest Server');
           
            RestServer.buildServices(this.app, ...services);
            this.app.use(this.errorHandler.getMiddleware());
            RestServer.immutable(true);
        }
        return serverless(RestServer.server());
    }
}