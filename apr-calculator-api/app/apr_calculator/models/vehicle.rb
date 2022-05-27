# frozen_string_literal: true

module AprCalculator
  class Vehicle
    attr_reader :year, :mileage

    def initialize(year:, mileage:)
      validate_year?(year: year)
      validate_mileage?(mileage: mileage)
      @year = year
      @mileage = mileage
    end

    private

    def validate_year?(year:)
      return true if year.to_i.positive? && year <= Time.new.year

      raise ArgumentError,
            'vehicle year should be an even positive integer and lower or equal than actual year'
    end

    def validate_mileage?(mileage:)
      return true if mileage.to_i.positive?

      raise ArgumentError,
            'vehicle mileage should be an even positive integer'
    end
  end
end
