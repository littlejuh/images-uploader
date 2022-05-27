import { Logger } from "typescript-loggable";
import { mockMethod } from "../../mock-util";
import { BaseRateCalculator } from "../../../src/application/base-rate-calculator";
import { Container } from "typescript-ioc";

describe('BaseRateCalculator', () => {
    let mockLogger: jest.Mock;
    let baseRateCalculator: BaseRateCalculator;
    
    beforeAll(() => {
        mockLogger = mockMethod(Logger, 'info');
        baseRateCalculator = Container.get(BaseRateCalculator);
    });

    beforeEach(() => {
        mockLogger.mockClear();
    });

    it('should get base rate of 4.75 for a loan term up to 36 months and Credit Score equal or more than 700', () => {
        const TERM = 36;
        const CREDIT_SCORE = 700;

        const result = baseRateCalculator.calculate(TERM, CREDIT_SCORE);

        expect(mockLogger).toBeCalledTimes(1);
        expect(mockLogger).toBeCalledWith(`BaseRateRules -> calculate rate for ${TERM} term and ${CREDIT_SCORE} credit score`);

        expect(result).toStrictEqual(4.75);
    });

    it('should get base rate of 5.75 for a loan term up to 36 months and Credit Score between 600 and 699', () => {
        const TERM = 36;
        const CREDIT_SCORE = 699;

        const result = baseRateCalculator.calculate(TERM, CREDIT_SCORE);

        expect(mockLogger).toBeCalledTimes(1);
        expect(mockLogger).toBeCalledWith(`BaseRateRules -> calculate rate for ${TERM} term and ${CREDIT_SCORE} credit score`);

        expect(result).toStrictEqual(5.75);
    });

    it('should get base rate of 12.75 for a loan term up to 36 months and Credit Score less than 600', () => {
        const TERM = 12;
        const CREDIT_SCORE = 500;

        const result = baseRateCalculator.calculate(TERM, CREDIT_SCORE);

        expect(mockLogger).toBeCalledTimes(1);
        expect(mockLogger).toBeCalledWith(`BaseRateRules -> calculate rate for ${TERM} term and ${CREDIT_SCORE} credit score`);

        expect(result).toStrictEqual(12.75);
    });

    it('should get base rate of 5.00 for a loan term up to 48 months and Credit Score equal or more than 700', () => {
        const TERM = 48;
        const CREDIT_SCORE = 701;

        const result = baseRateCalculator.calculate(TERM, CREDIT_SCORE);

        expect(mockLogger).toBeCalledTimes(1);
        expect(mockLogger).toBeCalledWith(`BaseRateRules -> calculate rate for ${TERM} term and ${CREDIT_SCORE} credit score`);

        expect(result).toStrictEqual(5.00);
    });

    it('should get base rate of 6.00 for a loan term up to 48 months and Credit Score between 600 and 699', () => {
        const TERM = 37;
        const CREDIT_SCORE = 600;

        const result = baseRateCalculator.calculate(TERM, CREDIT_SCORE);

        expect(mockLogger).toBeCalledTimes(1);
        expect(mockLogger).toBeCalledWith(`BaseRateRules -> calculate rate for ${TERM} term and ${CREDIT_SCORE} credit score`);

        expect(result).toStrictEqual(6.00);
    });

    it('should get base rate of 13.25 for a loan term up to 48 months and Credit Score less than 600', () => {
        const TERM = 48;
        const CREDIT_SCORE = 599;
        
        const result = baseRateCalculator.calculate(TERM, CREDIT_SCORE);

        expect(mockLogger).toBeCalledTimes(1);
        expect(mockLogger).toBeCalledWith(`BaseRateRules -> calculate rate for ${TERM} term and ${CREDIT_SCORE} credit score`);

        expect(result).toStrictEqual(13.25);
    });

    it('should get base rate of 5.50 for a loan term up to 60 months and Credit Score equal or more than 700', () => {
        const TERM = 49;
        const CREDIT_SCORE = 850;

        const result = baseRateCalculator.calculate(TERM, CREDIT_SCORE);

        expect(mockLogger).toBeCalledTimes(1);
        expect(mockLogger).toBeCalledWith(`BaseRateRules -> calculate rate for ${TERM} term and ${CREDIT_SCORE} credit score`);

        expect(result).toStrictEqual(5.50);
    });

    it('should get base rate of 6.65 for a loan term up to 60 months and Credit Score between 600 and 699', () => {
        const TERM = 60;
        const CREDIT_SCORE = 610;
       
        const result = baseRateCalculator.calculate(TERM, CREDIT_SCORE);

        expect(mockLogger).toBeCalledTimes(1);
        expect(mockLogger).toBeCalledWith(`BaseRateRules -> calculate rate for ${TERM} term and ${CREDIT_SCORE} credit score`);

        expect(result).toStrictEqual(6.65);
    });

    it('should get base rate of 0 for a loan term up to 60 months and Credit Score less than 600', () => {
        const TERM = 59;
        const CREDIT_SCORE = 400;

        const result = baseRateCalculator.calculate(TERM, CREDIT_SCORE);

        expect(mockLogger).toBeCalledTimes(1);
        expect(mockLogger).toBeCalledWith(`BaseRateRules -> calculate rate for ${TERM} term and ${CREDIT_SCORE} credit score`);

        expect(result).toStrictEqual(0);
    });
})