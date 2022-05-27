import { Inject } from "typescript-ioc";
import { Logger } from "typescript-loggable";
import { APRRequest } from "../controllers/apr-request";
import { BusinessException } from '../domain/errors';
import { BaseRateCalculator } from "./base-rate-calculator";
import { LoanAmountValidator } from "./loan-amount-validator";
import { VehicleTaxesApplier } from "./vehicle-taxes-applier";

export class AnnualPercentageRateUsecase {

    @Inject
    private logger!: Logger;

    @Inject
    private loanAmountValidator!: LoanAmountValidator;

    @Inject
    private baseRateRules!: BaseRateCalculator;

    @Inject
    private vehicleTaxesApplier!: VehicleTaxesApplier;

    public calculate(request: APRRequest): number{
        this.logger.info(`AnnualPercentageRateUsecase -> calculate()`);
        
        const violations = this.loanAmountValidator.check(request.loan.amount, request.loan.term, request.person.creditScore);
        if(violations.hasErrors()) {
            throw new BusinessException(violations.errorMessage());
        }

        let rate = this.baseRateRules.calculate(request.loan.term, request.person.creditScore);

        rate += this.vehicleTaxesApplier.apply(request.vehicle);

        this.logger.info(`The annual percentage rate is ${rate}`);
        return rate;
    }
}