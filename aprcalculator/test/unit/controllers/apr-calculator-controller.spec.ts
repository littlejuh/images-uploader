import { Container } from "typescript-ioc";
import { Logger } from 'typescript-loggable';
import { APRcalculatorController } from '../../../src/controllers/apr-calculator-controller';
import { APRRequest } from "../../../src/controllers/apr-request";
import {  mockMethod, mockMethods } from "../../mock-util";
import { ValidationException } from '../../../src/domain/errors';
import { AnnualPercentageRateUsecase } from '../../../src/application/loan-term-usecase';

describe('APRcalculatorController', () => {
    let mockLogger: Array<jest.Mock>;
    let mockUseCase: jest.Mock;

    let aprCalculatorController: APRcalculatorController;

    beforeAll(() => {
        mockLogger = mockMethods(Logger, 'info', 'error');
        mockUseCase = mockMethod(AnnualPercentageRateUsecase, 'calculate');
        aprCalculatorController = Container.get(APRcalculatorController);
    });

    afterEach(() => {
        mockLogger.map((mock) => mock.mockClear());
        mockUseCase.mockClear();
    });

    afterAll(() => {
        mockLogger.map((mock) => mock.mockClear());
        mockUseCase.mockClear();
    });

    it('should calculate APR successfuly', () => {
        mockUseCase.mockReturnValue(5.75);
        const request: APRRequest = {
            person: {
                creditScore: 700
            },
            loan: {
                amount: 10000,
                term: 36
            },
            vehicle: {
                year: 2014,
                mileage: 50000
            }
        }
        const result = aprCalculatorController.loanRate(request);
        const expectedResult = JSON.stringify({ APR: 5.75 });

        expect(mockLogger[0]).toBeCalledTimes(2);
        expect(mockLogger[0]).toHaveBeenNthCalledWith(1,`Starting annual percentage rate calculation... ${JSON.stringify(request)}`);
        expect(mockLogger[0]).toHaveBeenNthCalledWith(2,'The annual percentage rate was calculated successfully!');

        expect(mockUseCase).toBeCalledTimes(1);

        expect(result).toStrictEqual(expectedResult);
    });

    it('should return ValidationException when there is a payload validation error', () => {
        const request = {
            person: {
                creditScore: 700
            },
            loan: {
                amount: 10000,
                term: 36
            },
            vehicle: {
                year: 2014,
                mileage: -1
            }
        }

        expect(() => { aprCalculatorController.loanRate(request); }).toThrowError(new ValidationException('"vehicle.mileage" must be a positive number'));
    });
});