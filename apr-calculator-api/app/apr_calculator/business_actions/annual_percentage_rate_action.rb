# frozen_string_literal: true

module AprCalculator
  class AnnualPercentageRateAction
    attr_reader :annual_percentage_rate

    def initialize(params:)
      @annual_percentage_rate = AnnualPercentageRate.new(loan: params[:loan],
                                                         person: params[:person],
                                                         vehicle: params[:vehicle])
    end

    def validate?
      LoanValidator.valid?(loan: @annual_percentage_rate.loan)
    end

    def calculate
      rate = RateCalculatorAction.calculate(term: @annual_percentage_rate.loan.term,
                                            credit_score: @annual_percentage_rate.person.credit_score)

      rate += calculate_vehicle_taxes
      rate
    end

    private

    def calculate_vehicle_taxes
      VehicleTaxesAction.calculate(vehicle: @annual_percentage_rate.vehicle)
    end
  end
end
