
import { theMaximumAmountForScoreBelowSixHundredIsFiftyThousand, theMaximumAmountForScoreBetweenSixHundredAndSixHundreNinetyNineIsSeventyFiveThousand, 
    theMaximumAmountForScoreEqualToSevenHundredOrAboveIsHundredThousand, theMinimumAmountForLoansUpToFortyEightMonthsIsTenThousand, 
    theMinimumAmountForLoansUpToSixtyMonthsIsFifteenThousand, theMinimumAmountForLoansUpToThirtySixMonthsIsFiveThousand 
} from '../../../../src/application/rules/base-rate-rules';

describe('Base rate rules', () => {
    it('should return true when rules are correct', () => {
        expect(theMinimumAmountForLoansUpToThirtySixMonthsIsFiveThousand(5000, 36)).toBeTruthy();
        expect(theMinimumAmountForLoansUpToFortyEightMonthsIsTenThousand(10000, 48)).toBeTruthy();
        expect(theMinimumAmountForLoansUpToSixtyMonthsIsFifteenThousand(15000, 60)).toBeTruthy();
        expect(theMaximumAmountForScoreEqualToSevenHundredOrAboveIsHundredThousand(100000, 700)).toBeTruthy();
        expect(theMaximumAmountForScoreBetweenSixHundredAndSixHundreNinetyNineIsSeventyFiveThousand(75000, 699)).toBeTruthy();
        expect(theMaximumAmountForScoreBelowSixHundredIsFiftyThousand(50000, 500)).toBeTruthy();
    });

    it('should return false when rules are incorrect', () => {
        expect(theMinimumAmountForLoansUpToThirtySixMonthsIsFiveThousand(4000, 36)).toBeFalsy();
        expect(theMinimumAmountForLoansUpToFortyEightMonthsIsTenThousand(9000, 48)).toBeFalsy();
        expect(theMinimumAmountForLoansUpToSixtyMonthsIsFifteenThousand(14000, 60)).toBeFalsy();
        expect(theMaximumAmountForScoreEqualToSevenHundredOrAboveIsHundredThousand(100001, 700)).toBeFalsy();
        expect(theMaximumAmountForScoreBetweenSixHundredAndSixHundreNinetyNineIsSeventyFiveThousand(75001, 699)).toBeFalsy();
        expect(theMaximumAmountForScoreBelowSixHundredIsFiftyThousand(50001, 500)).toBeFalsy();
    });
});