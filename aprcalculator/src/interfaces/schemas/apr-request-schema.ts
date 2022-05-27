import * as joi from '@hapi/joi';
import { LoanSchema } from './loan-schema';
import { PersonSchema } from './person-schema';
import { VehicleSchema } from './vehicle-schema';

export const APRRequestSchema = joi.object({
    loan: LoanSchema.required(),
    person: PersonSchema.required(),
    vehicle: VehicleSchema.required()
});