import { termIsUpToFortyEight, termIsUpToSixty, termIsUpToThirtySix } from "../../../../src/application/rules/loan-term-rules";
describe('Loan term rules', () => {
    it('should return true when loan term rules are correct', () => {
        expect(termIsUpToThirtySix(36)).toBeTruthy();
        expect(termIsUpToFortyEight(40)).toBeTruthy();
        expect(termIsUpToSixty(50)).toBeTruthy();
    });

    it('should return false when loan term rules are incorrect', () => {
        expect(termIsUpToThirtySix(37)).toBeFalsy();
        expect(termIsUpToFortyEight(49)).toBeFalsy();
        expect(termIsUpToSixty(66)).toBeFalsy();
    });
});