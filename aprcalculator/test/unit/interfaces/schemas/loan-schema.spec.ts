import { Loan } from "../../../../src/domain/loan";
import { LoanSchema } from "../../../../src/interfaces/schemas/loan-schema";

describe('LoanSchema', () => {
    it('should not return errors when amount and term are numbers', () => {
        const loan: Loan = {
            amount:6000,
            term: 25
        };

        const { error } = LoanSchema.validate(loan);
        expect(error).toBeUndefined();
    });

    it('should return error when amount is not positive', () => {
        const loan: Loan = {
            amount:-100,
            term: 5
        };

        const { error } = LoanSchema.validate(loan);
        expect(error).not.toBeUndefined();
    });

    it('should return error when term is not positive', () => {
        const loan: Loan = {
            amount:1000,
            term: -5
        };

        const { error } = LoanSchema.validate(loan);
        expect(error).not.toBeUndefined();
    });
});