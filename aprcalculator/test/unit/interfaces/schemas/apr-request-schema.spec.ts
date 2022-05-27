import { APRRequest } from "../../../../src/controllers/apr-request";
import { APRRequestSchema } from "../../../../src/interfaces/schemas/apr-request-schema";

describe('DataRequestSchema', () => {
    it('should not return errors when data request is valid', () => {
        const request: APRRequest = {
            person: {
                creditScore: 100
            },
            vehicle: {
                year: 2020,
                mileage: 1000
            },
            loan: {
                amount: 4000,
                term: 46
            }
        };

        const { error } = APRRequestSchema.validate(request);
        expect(error).toBeUndefined();
    });

    it('should return error when field is not allowed', () => {
        const request = {
            person: {
                creditScore: 100
            },
            vehicle: {
                year: 2020,
                mileage: 1000
            },
            loan: {
                amount: 4000,
                term: 46
            },
            invalid: 'invalid'
        };

        const { error } = APRRequestSchema.validate(request);
        expect(error).not.toBeUndefined();
    });
});