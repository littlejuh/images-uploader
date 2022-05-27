# frozen_string_literal: true

module AprCalculator
  class AmountRules
    def self.min_five_thousand?(amount:)
      amount >= 5000
    end

    def self.min_ten_thousand?(amount:)
      amount >= 10_000
    end

    def self.min_fifteen_thousand?(amount:)
      amount >= 15_000
    end

    def self.max_fifty_thousand?(amount:)
      amount <= 50_000
    end

    def self.max_seventy_five_thousand?(amount:)
      amount <= 75_000
    end

    def self.max_hundred_thousand?(amount:)
      amount <= 100_000
    end
  end
end
