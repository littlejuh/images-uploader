import { BusinessException, ValidationException } from "../../../src/domain/errors";
describe('domain errors', () => {
    it('Inform a valid errorCode for each type of error', () => {
        expect(new ValidationException().code).toEqual('PayloadValidation');
        expect(new BusinessException().code).toEqual('BusinessValidation');
    });
});