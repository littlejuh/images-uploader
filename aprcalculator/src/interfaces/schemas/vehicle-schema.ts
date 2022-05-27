import * as joi from '@hapi/joi';

export const VehicleSchema = joi.object({
    year: joi.number().positive().max(2021).required(),
    mileage: joi.number().positive().required()
});