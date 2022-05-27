import { Person } from "../../../../src/domain/person";
import { PersonSchema } from "../../../../src/interfaces/schemas/person-schema";

describe('PersonSchema', () => {
    it('should not return errors when creditScore is positive number', () => {
        const person: Person = {
            creditScore: 100
        };

        const { error } = PersonSchema.validate(person);
        expect(error).toBeUndefined();
    });

    it('should return error when creditScore is not positive number', () => {
        const person: Person = {
            creditScore: -100
        };

        const { error } = PersonSchema.validate(person);
        expect(error).not.toBeUndefined();
    });
});