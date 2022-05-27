import { Container } from 'typescript-ioc';
import { LoanAmountValidator } from '../../../src/application/loan-amount-validator';
import { AnnualPercentageRateUsecase } from '../../../src/application/loan-term-usecase';
import { Notification } from '../../../src/application/notification';
import { BusinessException } from '../../../src/domain/errors';
import { Loan } from '../../../src/domain/loan';
import { Person } from '../../../src/domain/person';
import { dataRequestFixture } from '../../fixtures/data-request-fixture';
import { mockMethod } from '../../mock-util';

describe('LoanTermUsecase', () => {
    let loanTermUsecase: AnnualPercentageRateUsecase;
    let mockLoanAmountValidator: jest.Mock;

    beforeAll(() => {
        loanTermUsecase = Container.get(AnnualPercentageRateUsecase);
        mockLoanAmountValidator = mockMethod(LoanAmountValidator, 'check');
    });

    afterEach(() => {
        mockLoanAmountValidator.mockClear();
    });

    it('should return base rate successfully', () => {
        const request = dataRequestFixture();
        mockLoanAmountValidator.mockReturnValue(new Notification());

        const rate = loanTermUsecase.calculate(request);

        expect(mockLoanAmountValidator).toBeCalledTimes(1);
        expect(mockLoanAmountValidator).toBeCalledWith(request.loan.amount, request.loan.term, request.person.creditScore);

        expect(rate).toStrictEqual(5.75);
    });

    describe('Throws BusinessException when some violation occurs', () => {
        describe('For minimun loan amount', () => {

            it('should validate that the minimum loan amount for loans up to 36 months is $ 5,000', () => {
                const loan: Loan = {
                    amount: 3000,
                    term: 36
                };
        
                const request = dataRequestFixture({loan: loan});
                const notification: Notification = new Notification();
                notification.addError('The minimum loan amount for loans up to 36 months is $ 5,000');
        
                mockLoanAmountValidator.mockReturnValue(notification);
        
                expect(() => { loanTermUsecase.calculate(request); }).toThrowError(new BusinessException(notification.errorMessage()));
            });
    
            it('should validate that the minimum loan amount for loans up to 48 months is $ 10,000', () => {
                const loan: Loan = {
                    amount: 3000,
                    term: 40
                };
        
                const request = dataRequestFixture({loan: loan});
                const notification: Notification = new Notification();
                notification.addError('The minimum loan amount for loans up to 48 months is $ 10,000');
        
                mockLoanAmountValidator.mockReturnValue(notification);
        
                expect(() => { loanTermUsecase.calculate(request); }).toThrowError(new BusinessException(notification.errorMessage()));
            });
    
            it('should validate that the minimum loan amount for loans up to 60 months is $ 15,000', () => {
                const loan: Loan = {
                    amount: 3000,
                    term: 56
                };
        
                const request = dataRequestFixture({loan: loan});
                const notification: Notification = new Notification();
                notification.addError('The minimum loan amount for loans up to 60 months is $ 15,000');
        
                mockLoanAmountValidator.mockReturnValue(notification);
        
                expect(() => { loanTermUsecase.calculate(request); }).toThrowError(new BusinessException(notification.errorMessage()));
            });
        });

        describe('For maximun loan amount', () => {
            it('The maximum loan amount for credit score equal to 700 or above is $ 100,000', () => { 
                const loan: Loan = {
                    amount: 100001,
                    term: 36
                };

                const person: Person = {
                    creditScore: 700
                }; 
        
                const request = dataRequestFixture({loan: loan, person: person});
                const notification: Notification = new Notification();
                notification.addError('The maximum loan amount for credit score equal to 700 or above is $ 100,000');
        
                mockLoanAmountValidator.mockReturnValue(notification);
        
                expect(() => { loanTermUsecase.calculate(request); }).toThrowError(new BusinessException(notification.errorMessage()));
            });

            it('The maximum loan amount for credit score between 600 and 699 is $ 75,000', () => { 
                const loan: Loan = {
                    amount: 100001,
                    term: 36
                };

                const person: Person = {
                    creditScore: 601
                }; 
        
                const request = dataRequestFixture({loan: loan, person: person});
                const notification: Notification = new Notification();
                notification.addError('The maximum loan amount for credit score between 600 and 699 is $ 75,000');
        
                mockLoanAmountValidator.mockReturnValue(notification);
        
                expect(() => { loanTermUsecase.calculate(request); }).toThrowError(new BusinessException(notification.errorMessage()));
            }); 

            it('The maximum loan amount for credit score below 600 is $ 50,000', () => { 
                const loan: Loan = {
                    amount: 100001,
                    term: 36
                };

                const person: Person = {
                    creditScore: 599
                }; 
        
                const request = dataRequestFixture({loan: loan, person: person});
                const notification: Notification = new Notification();
                notification.addError('The maximum loan amount for credit score below 600 is $ 50,000');
        
                mockLoanAmountValidator.mockReturnValue(notification);
        
                expect(() => { loanTermUsecase.calculate(request); }).toThrowError(new BusinessException(notification.errorMessage()));
            }); 
        });
    });
});