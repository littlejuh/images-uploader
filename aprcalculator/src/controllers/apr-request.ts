import { Loan } from "../domain/loan";
import { Person } from "../domain/person";
import { Vehicle } from "../domain/vehicle";

export interface APRRequest{
    loan: Loan;
    person: Person;
    vehicle: Vehicle;
}