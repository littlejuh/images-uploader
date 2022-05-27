# frozen_string_literal: true

module AprCalculator
  class AnnualPercentageRate
    attr_reader :loan, :person, :vehicle

    def initialize(loan:, person:, vehicle:)
      validate?(loan: loan, person: person, vehicle: vehicle)
      @loan = Loan.new(amount: loan[:amount], term: loan[:term])
      @person = Person.new(credit_score: person[:credit_score])
      @vehicle = Vehicle.new(year: vehicle[:year], mileage: vehicle[:mileage])
    end

    private

    def validate?(loan:, person:, vehicle:)
      validate_loan?(loan: loan)
      validate_person?(person: person)
      validate_vehicle?(vehicle: vehicle)
    end

    def validate_loan?(loan:)
      return true unless loan.nil?

      raise ArgumentError,
            'loan should be present'
    end

    def validate_person?(person:)
      return true unless person.nil?

      raise ArgumentError,
            'person should be present'
    end

    def validate_vehicle?(vehicle:)
      return true unless vehicle.nil?

      raise ArgumentError,
            'vehicle should be present'
    end
  end
end
