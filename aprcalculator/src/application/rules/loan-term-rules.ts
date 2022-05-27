export const termIsUpToThirtySix = (term: number) => {
    return term <= 36;
}

export const termIsUpToFortyEight = (term: number) => {
    return !termIsUpToThirtySix(term) && term <= 48;
}

export const termIsUpToSixty = (term: number) => {
    return term > 48 && term <= 60;
}