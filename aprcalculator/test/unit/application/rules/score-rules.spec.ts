import { scoreIsBelowSixHundred, scoreIsBetweenSixHundredAndSixHundreNinetyNine, scoreIsEqualSevenHundredOrAbove } from "../../../../src/application/rules/score-rules";
describe('Loan term rules', () => {
    it('should return true when loan term rules are correct', () => {
        expect(scoreIsBetweenSixHundredAndSixHundreNinetyNine(680)).toBeTruthy();
        expect(scoreIsBelowSixHundred(490)).toBeTruthy();
        expect(scoreIsEqualSevenHundredOrAbove(700)).toBeTruthy();
    });

    it('should return false when loan term rules are incorrect', () => {
        expect(scoreIsBetweenSixHundredAndSixHundreNinetyNine(700)).toBeFalsy();
        expect(scoreIsBelowSixHundred(601)).toBeFalsy();
        expect(scoreIsEqualSevenHundredOrAbove(699)).toBeFalsy();
    });
});