export const scoreIsBetweenSixHundredAndSixHundreNinetyNine = (creditScore: number) => {
    return creditScore >= 600 && creditScore <= 699;
}

export const scoreIsEqualSevenHundredOrAbove = (creditScore: number) => {
    return creditScore >= 700;
}

export const scoreIsBelowSixHundred = (creditScore: number) => {
    return creditScore < 600;
}