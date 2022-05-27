import * as joi from '@hapi/joi';

export const PersonSchema = joi.object({
    creditScore: joi.number().positive().required()
});