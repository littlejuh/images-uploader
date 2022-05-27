import { mockMethods } from "../../mock-util";
import { LoanAmountValidator } from "../../../src/application/loan-amount-validator";
import { Logger } from "typescript-loggable";
import { Container } from "typescript-ioc";
import { Notification } from '../../../src/application/notification';

describe('LoanAmountValidator', () => {
    let mockLoggerInfo: jest.Mock;
    let mockLoggerError: jest.Mock;
    let loanAmountValidator: LoanAmountValidator;

    beforeAll(() => {
        [mockLoggerInfo, mockLoggerError] = mockMethods(Logger, 'info', 'error');
        loanAmountValidator = Container.get(LoanAmountValidator);
    })

    beforeEach(() => {
        mockLoggerInfo.mockClear();
        mockLoggerError.mockClear();
    });

    afterAll(() => {
        mockLoggerInfo.mockClear();
        mockLoggerError.mockClear();
    });

    describe('Validate the minimum loan amount', () => {
        it('should validate that the minimum loan amount for loans up to 36 months is $ 5,000', () => {
            const TERM = 20;
            const AMOUNT = 5000;
            const SCORE = 700;
    
            const result = loanAmountValidator.check(AMOUNT, TERM, SCORE);
    
            expect(mockLoggerInfo).toBeCalledTimes(1);
            expect(mockLoggerInfo).toBeCalledWith(`Validating loan amount -> amount: ${AMOUNT}, term: ${TERM}, score: ${SCORE}`);
    
            expect(result).toBeTruthy();
        });

        it('should validate that the minimum loan amount for loans up to 48 months is $ 10,000', () => {
            const TERM = 39;
            const AMOUNT = 10000;
            const SCORE = 700;
    
            const result = loanAmountValidator.check(AMOUNT, TERM, SCORE);
    
            expect(mockLoggerInfo).toBeCalledTimes(1);
            expect(mockLoggerInfo).toBeCalledWith(`Validating loan amount -> amount: ${AMOUNT}, term: ${TERM}, score: ${SCORE}`);
    
            expect(result).toBeTruthy();
        });

        it('should validate that the minimum loan amount for loans up to 60 months is $ 15,000', () => {
            const TERM = 60;
            const AMOUNT = 20000;
            const SCORE = 700;
    
            const result = loanAmountValidator.check(AMOUNT, TERM, SCORE);
    
            expect(mockLoggerInfo).toBeCalledTimes(1);
            expect(mockLoggerInfo).toBeCalledWith(`Validating loan amount -> amount: ${AMOUNT}, term: ${TERM}, score: ${SCORE}`);
    
            expect(result).toBeTruthy();
        });
    });

    describe('Validate the maximum loan amount', () => {
        it('should validate that the maximum loan amount for credit score equal to 700 or above is $ 100,000', () => {
            const CREDIT_SCORE = 700;
            const TERM = 20;
            const AMOUNT = 100000
    
            const result = loanAmountValidator.check(AMOUNT, TERM, CREDIT_SCORE);
    
            expect(mockLoggerInfo).toBeCalledTimes(1);
            expect(mockLoggerInfo).toBeCalledWith(`Validating loan amount -> amount: ${AMOUNT}, term: ${TERM}, score: ${CREDIT_SCORE}`);
    
            expect(result).toBeTruthy();
        });

        it('The maximum loan amount for credit score between 600 and 699 is $ 75,000', () => {
            const CREDIT_SCORE = 699;
            const TERM = 48;
            const AMOUNT = 60000
    
            const result = loanAmountValidator.check(AMOUNT, TERM, CREDIT_SCORE);
    
            expect(mockLoggerInfo).toBeCalledTimes(1);
            expect(mockLoggerInfo).toBeCalledWith(`Validating loan amount -> amount: ${AMOUNT}, term: ${TERM}, score: ${CREDIT_SCORE}`);
    
            expect(result).toBeTruthy();
        });

        it('The maximum loan amount for credit score below 600 is $ 50,000', () => {
            const CREDIT_SCORE = 589;
            const TERM = 48;
            const AMOUNT = 40000
    
            const result = loanAmountValidator.check(AMOUNT, TERM, CREDIT_SCORE);
    
            expect(mockLoggerInfo).toBeCalledTimes(1);
            expect(mockLoggerInfo).toBeCalledWith(`Validating loan amount -> amount: ${AMOUNT}, term: ${TERM}, score: ${CREDIT_SCORE}`);
    
            expect(result).toBeTruthy();
        });
    });

    describe('Notify violation error', () => {
        describe('For minimun loan amount', () => {
            it('should validate that the minimum loan amount for loans up to 36 months is $ 5,000', () => { 
                const TERM = 20;
                const AMOUNT = 4000
                const SCORE = 700;

                const expectedNotification: Notification = new Notification();
                expectedNotification.addError('The minimum loan amount for loans up to 36 months is $ 5,000');

                const result = loanAmountValidator.check(AMOUNT, TERM, SCORE);
                
                expect(mockLoggerInfo).toBeCalledTimes(1);
                expect(mockLoggerInfo).toBeCalledWith(`Validating loan amount -> amount: ${AMOUNT}, term: ${TERM}, score: ${SCORE}`);
    
                expect(result).toStrictEqual(expectedNotification);
            });
    
            it('should validate that the minimum loan amount for loans up to 48 months is $ 10,000', () => {
                const TERM = 45;
                const AMOUNT = 4000
                const SCORE = 700;

                const expectedNotification: Notification = new Notification();
                expectedNotification.addError('The minimum loan amount for loans up to 48 months is $ 10,000');

                const result = loanAmountValidator.check(AMOUNT, TERM, SCORE);
                
                expect(mockLoggerInfo).toBeCalledTimes(1);
                expect(mockLoggerInfo).toBeCalledWith(`Validating loan amount -> amount: ${AMOUNT}, term: ${TERM}, score: ${SCORE}`);
    
                expect(result).toStrictEqual(expectedNotification);
            });
    
            it('should validate that the minimum loan amount for loans up to 60 months is $ 15,000', () => {
                const TERM = 50;
                const AMOUNT = 4000
                const SCORE = 700;

                const expectedNotification: Notification = new Notification();
                expectedNotification.addError('The minimum loan amount for loans up to 60 months is $ 15,000');

                const result = loanAmountValidator.check(AMOUNT, TERM, SCORE);
                
                expect(mockLoggerInfo).toBeCalledTimes(1);
                expect(mockLoggerInfo).toBeCalledWith(`Validating loan amount -> amount: ${AMOUNT}, term: ${TERM}, score: ${SCORE}`);
    
                expect(result).toStrictEqual(expectedNotification);    
            });
        });

        describe('For maximun loan amount', () => {
            it('The maximum loan amount for credit score equal to 700 or above is $ 100,000', () => { 
                const TERM = 50;
                const AMOUNT = 100001
                const SCORE = 700;

                const expectedNotification: Notification = new Notification();
                expectedNotification.addError('The maximum loan amount for credit score equal to 700 or above is $ 100,000');

                const result = loanAmountValidator.check(AMOUNT, TERM, SCORE);
                
                expect(mockLoggerInfo).toBeCalledTimes(1);
                expect(mockLoggerInfo).toBeCalledWith(`Validating loan amount -> amount: ${AMOUNT}, term: ${TERM}, score: ${SCORE}`);
    
                expect(result).toStrictEqual(expectedNotification);                 
            });

            it('The maximum loan amount for credit score between 600 and 699 is $ 75,000', () => { 
                const TERM = 50;
                const AMOUNT = 100001
                const SCORE = 600;

                const expectedNotification: Notification = new Notification();
                expectedNotification.addError('The maximum loan amount for credit score between 600 and 699 is $ 75,000');

                const result = loanAmountValidator.check(AMOUNT, TERM, SCORE);
                
                expect(mockLoggerInfo).toBeCalledTimes(1);
                expect(mockLoggerInfo).toBeCalledWith(`Validating loan amount -> amount: ${AMOUNT}, term: ${TERM}, score: ${SCORE}`);
    
                expect(result).toStrictEqual(expectedNotification);                 
            }); 

            it('The maximum loan amount for credit score below 600 is $ 50,000', () => { 
                const TERM = 50;
                const AMOUNT = 100001
                const SCORE = 500;

                const expectedNotification: Notification = new Notification();
                expectedNotification.addError('The maximum loan amount for credit score below 600 is $ 50,000');

                const result = loanAmountValidator.check(AMOUNT, TERM, SCORE);
                
                expect(mockLoggerInfo).toBeCalledTimes(1);
                expect(mockLoggerInfo).toBeCalledWith(`Validating loan amount -> amount: ${AMOUNT}, term: ${TERM}, score: ${SCORE}`);
    
                expect(result).toStrictEqual(expectedNotification); 
            }); 
        });
    });
});