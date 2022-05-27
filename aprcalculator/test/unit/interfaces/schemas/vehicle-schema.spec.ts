import { Vehicle } from "../../../../src/domain/vehicle";
import { VehicleSchema } from "../../../../src/interfaces/schemas/vehicle-schema";

describe('VehicleSchema', () => {
    it('should not return errors when year and mileage are positive numbers', () => {
        const vehicle: Vehicle = {
            year: 1999,
            mileage: 1000
        };

        const { error } = VehicleSchema.validate(vehicle);
        expect(error).toBeUndefined();
    });

    it('should return error when year is greater than 2021', () => {
        const vehicle: Vehicle = {
            year: 2022,
            mileage: 1000
        };

        const { error } = VehicleSchema.validate(vehicle);
        expect(error).not.toBeUndefined();
    });

    it('should return errors when year is not positive number', () => {
        const vehicle: Vehicle = {
            year: -2022,
            mileage: 1000
        };

        const { error } = VehicleSchema.validate(vehicle);
        expect(error).not.toBeUndefined();
    });

    it('should return errors when mileage is not positive number', () => {
        const vehicle: Vehicle = {
            year: 2022,
            mileage: -1000
        };

        const { error } = VehicleSchema.validate(vehicle);
        expect(error).not.toBeUndefined();
    });
});