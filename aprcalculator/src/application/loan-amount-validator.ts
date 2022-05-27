import { Inject } from "typescript-ioc";
import { Logger } from "typescript-loggable";
import { termIsUpToFortyEight, termIsUpToSixty, termIsUpToThirtySix } from './rules/loan-term-rules';
import { scoreIsBelowSixHundred, scoreIsBetweenSixHundredAndSixHundreNinetyNine, scoreIsEqualSevenHundredOrAbove } from './rules/score-rules';
import { Notification } from "./notification";
import { theMaximumAmountForScoreBelowSixHundredIsFiftyThousand, theMaximumAmountForScoreBetweenSixHundredAndSixHundreNinetyNineIsSeventyFiveThousand, theMaximumAmountForScoreEqualToSevenHundredOrAboveIsHundredThousand, theMinimumAmountForLoansUpToFortyEightMonthsIsTenThousand, theMinimumAmountForLoansUpToSixtyMonthsIsFifteenThousand, theMinimumAmountForLoansUpToThirtySixMonthsIsFiveThousand } from './rules/base-rate-rules';

export class LoanAmountValidator {

    @Inject
    private logger!: Logger;

    public check(amount: number, term: number, creditScore: number): Notification {
        return this.validation(amount, term, creditScore);
    }

    private validation(amount: number, term: number, creditScore: number): Notification {

        this.logger.info(`Validating loan amount -> amount: ${amount}, term: ${term}, score: ${creditScore}`);
        const note = new Notification();

        if(termIsUpToThirtySix(term) && !theMinimumAmountForLoansUpToThirtySixMonthsIsFiveThousand(amount, term)){
            note.addError('The minimum loan amount for loans up to 36 months is $ 5,000');
        }
        if(termIsUpToFortyEight(term) && !theMinimumAmountForLoansUpToFortyEightMonthsIsTenThousand(amount, term)){
            note.addError('The minimum loan amount for loans up to 48 months is $ 10,000');
        }
        if(termIsUpToSixty(term) && !theMinimumAmountForLoansUpToSixtyMonthsIsFifteenThousand(amount, term)){
            note.addError('The minimum loan amount for loans up to 60 months is $ 15,000');
        }

        if(scoreIsEqualSevenHundredOrAbove(creditScore) && !theMaximumAmountForScoreEqualToSevenHundredOrAboveIsHundredThousand(amount, creditScore)){
            note.addError('The maximum loan amount for credit score equal to 700 or above is $ 100,000');
        }

        if(scoreIsBetweenSixHundredAndSixHundreNinetyNine(creditScore) && !theMaximumAmountForScoreBetweenSixHundredAndSixHundreNinetyNineIsSeventyFiveThousand(amount, creditScore)) {
            note.addError('The maximum loan amount for credit score between 600 and 699 is $ 75,000');
        }

        if(scoreIsBelowSixHundred(creditScore) && !theMaximumAmountForScoreBelowSixHundredIsFiftyThousand(amount, creditScore)) {
            note.addError('The maximum loan amount for credit score below 600 is $ 50,000');
        }

        return note;
    }
}