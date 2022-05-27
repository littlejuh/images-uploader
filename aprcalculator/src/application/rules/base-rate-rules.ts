import { maximumFiftyThousand, maximumHundredThousand, maximumSeventyFiveThousand, minimumFifteenThousand, minimumFiveThousand, minimumTenThousand } from './amount-rules';
import { termIsUpToFortyEight, termIsUpToSixty, termIsUpToThirtySix } from './loan-term-rules';
import { scoreIsBelowSixHundred, scoreIsBetweenSixHundredAndSixHundreNinetyNine, scoreIsEqualSevenHundredOrAbove } from './score-rules';

export const theMinimumAmountForLoansUpToThirtySixMonthsIsFiveThousand = (amount: number, term: number): boolean => {
    return termIsUpToThirtySix(term) && minimumFiveThousand(amount);
}

export const theMinimumAmountForLoansUpToFortyEightMonthsIsTenThousand = (amount: number, term: number): boolean => {
    return termIsUpToFortyEight(term) && minimumTenThousand(amount);
}

export const theMinimumAmountForLoansUpToSixtyMonthsIsFifteenThousand = (amount: number, term: number): boolean => {
    return termIsUpToSixty(term) && minimumFifteenThousand(amount);
}

export const theMaximumAmountForScoreEqualToSevenHundredOrAboveIsHundredThousand = (amount: number, creditScore: number): boolean => {
    return scoreIsEqualSevenHundredOrAbove(creditScore) && maximumHundredThousand(amount);
}

export const theMaximumAmountForScoreBetweenSixHundredAndSixHundreNinetyNineIsSeventyFiveThousand = (amount: number, creditScore: number): boolean => {
    return scoreIsBetweenSixHundredAndSixHundreNinetyNine(creditScore) && maximumSeventyFiveThousand(amount);
}

export const theMaximumAmountForScoreBelowSixHundredIsFiftyThousand = (amount: number, creditScore: number): boolean => {
    return scoreIsBelowSixHundred(creditScore) && maximumFiftyThousand(amount);
}