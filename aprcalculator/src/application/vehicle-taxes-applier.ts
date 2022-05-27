import { Inject } from "typescript-ioc";
import { Logger } from "typescript-loggable";
import { Vehicle } from "../domain/vehicle";

export class VehicleTaxesApplier {
    @Inject
    private logger!: Logger;

    public apply(vehicle: Vehicle): number{
        this.logger.info(`Aplying vehicle taxes -> year: ${vehicle.year}, mileage: ${vehicle.mileage}`);

        let vehicleTaxes = 0;
        if(vehicle.year < 2015){
            vehicleTaxes += 1.00;
        }

        if(vehicle.mileage > 100000) {
            vehicleTaxes += 2.00
        }

        this.logger.info(`The total vehicle taxes is ${vehicleTaxes}`);

        return vehicleTaxes;
    }
}