import fetch, { Response } from 'node-fetch';

describe('Loan Rate', () => {
    it('should calculate th annual percentage rate for a vehicle loan successfuly', async () => {
        const input = require('../fixtures/successful-request-payload.json');
        
        const options = {
            method: 'POST',
            body: JSON.stringify(input),
            headers: {
                'Content-Type': 'application/json'
            }
        };
        const response: Response = await fetch('http://localhost:3000/local/apr-calculator/v1/rate', options);
        const responseJson: any = await response.json();

        expect(response.status).toEqual(200);
        expect(responseJson).toEqual({ APR: 5.75});
    });

    it('should return a payload validation error', async () => {
        const input = require('../fixtures/validation-error-request-payload.json');
        
        const options = {
            method: 'POST',
            body: JSON.stringify(input),
            headers: {
                'Content-Type': 'application/json'
            }
        };
        const response: Response = await fetch('http://localhost:3000/local/apr-calculator/v1/rate', options);
        const responseJson: any = await response.json();

        expect(response.status).toEqual(400);
        expect(responseJson).toEqual({ code: 'PayloadValidation', message: '\"vehicle.mileage\" must be a positive number' });
    });

    it('should return a business rule error', async () => {
        const input = require('../fixtures/business-error-request-payload.json');
        
        const options = {
            method: 'POST',
            body: JSON.stringify(input),
            headers: {
                'Content-Type': 'application/json'
            }
        };
        const response: Response = await fetch('http://localhost:3000/local/apr-calculator/v1/rate', options);
        const responseJson: any = await response.json();

        expect(response.status).toEqual(403);
        expect(responseJson).toEqual({ code: 'BusinessValidation', message: 'The minimum loan amount for loans up to 36 months is $ 5,000' });
    });
});