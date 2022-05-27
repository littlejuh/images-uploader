import { Container } from 'typescript-ioc';
import { Logger } from 'typescript-loggable';
import { VehicleTaxesApplier } from '../../../src/application/vehicle-taxes-applier';
import { Vehicle } from '../../../src/domain/vehicle';
import { dataRequestFixture } from '../../fixtures/data-request-fixture';
import { mockMethod } from '../../mock-util';

describe('VehicleTaxesApplier', () => {
    let vehicleTaxesApplier: VehicleTaxesApplier;
    let mockLogger: jest.Mock;

    beforeAll(() => {
        vehicleTaxesApplier = Container.get(VehicleTaxesApplier);
        mockLogger = mockMethod(Logger, 'info');
    });

    afterEach(() => {
        mockLogger.mockClear();
    });

    it('should return tax for vehicle year', () => {
        const request = dataRequestFixture();

        const taxes = vehicleTaxesApplier.apply(request.vehicle);

        expect(mockLogger).toBeCalledTimes(2);
        expect(taxes).toStrictEqual(1);
    });

    it('should return tax for vehicle mileage', () => {
        const vehicle: Vehicle = {
            year:2015,
            mileage: 100001
        };

        const request = dataRequestFixture({vehicle: vehicle});
        const taxes = vehicleTaxesApplier.apply(request.vehicle);

        expect(mockLogger).toBeCalledTimes(2);
        expect(taxes).toStrictEqual(2);
    });

    it('should return tax for vehicle mileage and year', () => {
        const vehicle: Vehicle = {
            year:2013,
            mileage: 100001
        };

        const request = dataRequestFixture({vehicle: vehicle});
        const taxes = vehicleTaxesApplier.apply(request.vehicle);

        expect(mockLogger).toBeCalledTimes(2);
        expect(taxes).toStrictEqual(3);
    });

    it('should return zero when there is no taxes applied', () => {
        const vehicle: Vehicle = {
            year:2019,
            mileage: 99000
        };

        const request = dataRequestFixture({vehicle: vehicle});
        const taxes = vehicleTaxesApplier.apply(request.vehicle);

        expect(mockLogger).toBeCalledTimes(2);
        expect(taxes).toStrictEqual(0);
    });
});