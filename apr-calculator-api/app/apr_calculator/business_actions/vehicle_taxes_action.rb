# frozen_string_literal: true

module AprCalculator
  class VehicleTaxesAction
    def self.calculate(vehicle:)
      vehicle_taxes = 0
      vehicle_taxes += 1.00 if vehicle.year < 2015
      vehicle_taxes += 2.00 if vehicle.mileage > 100_000
      vehicle_taxes
    end
  end
end
