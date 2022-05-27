import { maximumFiftyThousand, maximumHundredThousand, maximumSeventyFiveThousand, minimumFifteenThousand, minimumFiveThousand, minimumTenThousand} from "../../../../src/application/rules/amount-rules";
describe('Amount rules', () => {
    it('should return true when amount rules are correct', () => {
        expect(minimumFiveThousand(5000)).toBeTruthy();
        expect(minimumFifteenThousand(15500)).toBeTruthy();
        expect(minimumTenThousand(10011)).toBeTruthy();
        expect(maximumHundredThousand(100000)).toBeTruthy();
        expect(maximumFiftyThousand(50000)).toBeTruthy();
        expect(maximumSeventyFiveThousand(75000)).toBeTruthy();
    });

    it('should return false when amount rules are incorrect', () => {
        expect(minimumFiveThousand(4000)).toBeFalsy();
        expect(minimumFifteenThousand(14500)).toBeFalsy();
        expect(minimumTenThousand(9011)).toBeFalsy();
        expect(maximumHundredThousand(100001)).toBeFalsy();
        expect(maximumFiftyThousand(50001)).toBeFalsy();
        expect(maximumSeventyFiveThousand(75001)).toBeFalsy();
    });
});