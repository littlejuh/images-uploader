import { Inject } from "typescript-ioc";
import { POST, Path } from "typescript-rest";
import { APRRequest } from "./apr-request";
import { Logger } from 'typescript-loggable';
import { APRRequestSchema } from "../interfaces/schemas/apr-request-schema";
import { ValidationException } from "../domain/errors";
import { AnnualPercentageRateUsecase } from "../application/loan-term-usecase";

@Path('/apr-calculator/v1/')
export class APRcalculatorController {

    @Inject
    private logger!: Logger;

    @Inject
    private loanTermUsecase!: AnnualPercentageRateUsecase;
    
    @POST
    @Path('/rate')
    public loanRate(request: APRRequest) {
        this.logger.info(`Starting annual percentage rate calculation... ${JSON.stringify(request)}`);

        const { error } = APRRequestSchema.validate(request);
        if (error) {
            this.logger.error(`APRcalculatorController -> loanRate() - validation error ${error}`);
            throw new ValidationException(error.message);
        }

        const rate = this.loanTermUsecase.calculate(request);

        this.logger.info(`The annual percentage rate was calculated successfully!`);

        return JSON.stringify({ APR: rate});
    }
}