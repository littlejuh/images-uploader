import * as joi from '@hapi/joi';

export const LoanSchema = joi.object({
    amount: joi.number().positive().required(),
    term: joi.number().positive().required()
});