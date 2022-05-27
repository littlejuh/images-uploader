import { Inject } from "typescript-ioc";
import { Logger } from "typescript-loggable";
import { scoreIsBelowSixHundred, scoreIsBetweenSixHundredAndSixHundreNinetyNine, scoreIsEqualSevenHundredOrAbove } from './rules/score-rules';
import { termIsUpToFortyEight, termIsUpToSixty, termIsUpToThirtySix } from './rules/loan-term-rules';

export class BaseRateCalculator {

    @Inject
    private logger!: Logger;

    public calculate(term: number, creditScore: number): number {
        this.logger.info(`BaseRateRules -> calculate rate for ${term} term and ${creditScore} credit score`);
        
        const rules = [
            {rate: 4.75, loanTerm: termIsUpToThirtySix(term), score: scoreIsEqualSevenHundredOrAbove(creditScore)},
            {rate: 5.75, loanTerm: termIsUpToThirtySix(term), score: scoreIsBetweenSixHundredAndSixHundreNinetyNine(creditScore)},
            {rate: 12.75, loanTerm: termIsUpToThirtySix(term), score: scoreIsBelowSixHundred(creditScore)},
            {rate: 5.00, loanTerm: termIsUpToFortyEight(term), score: scoreIsEqualSevenHundredOrAbove(creditScore)},
            {rate: 6.00, loanTerm: termIsUpToFortyEight(term), score: scoreIsBetweenSixHundredAndSixHundreNinetyNine(creditScore)},
            {rate: 13.25, loanTerm: termIsUpToFortyEight(term), score: scoreIsBelowSixHundred(creditScore)},
            {rate: 5.50, loanTerm: termIsUpToSixty(term), score: scoreIsEqualSevenHundredOrAbove(creditScore)},
            {rate: 6.65, loanTerm: termIsUpToSixty(term), score: scoreIsBetweenSixHundredAndSixHundreNinetyNine(creditScore)},
            {rate: 0, loanTerm: termIsUpToSixty(term), score: scoreIsBelowSixHundred(creditScore)}
        ]; 
        
        return rules
            .filter(rule => rule.loanTerm  && rule.score)
            .map(r => r.rate)[0];
    }
}