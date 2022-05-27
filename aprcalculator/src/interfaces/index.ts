import { Server } from '../infrastructure/server';
import { Container } from 'typescript-ioc';
import { APRcalculatorController } from '../controllers/apr-calculator-controller';

const server = Container.get(Server);
module.exports.handler = server.configureServer([APRcalculatorController]);