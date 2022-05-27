import { APRRequest } from '../../src/controllers/apr-request'

export const dataRequestFixture = (fields?: Partial<APRRequest>) => {
    return {
        loan: {
           amount: 10000,
           term: 36
        },
        person: {
           creditScore: 700
        },
        vehicle: {
           year: 2014,
           mileage: 36
        },
        ...fields
     } as APRRequest;
}