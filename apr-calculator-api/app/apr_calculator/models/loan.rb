# frozen_string_literal: true

module AprCalculator
  class Loan
    attr_reader :amount, :term

    def initialize(amount:, term:)
      validate_amount?(amount: amount)
      validate_term?(term: term)
      @amount = amount
      @term = term
    end

    private

    def validate_amount?(amount:)
      return true if amount.to_i.positive?

      raise ArgumentError,
            'loan amount should be an even positive integer'
    end

    def validate_term?(term:)
      return true if term.to_i.positive?

      raise ArgumentError,
            'loan term should be an even positive integer'
    end
  end
end
