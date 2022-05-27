# frozen_string_literal: true

module AprCalculator
  class Person
    attr_reader :credit_score

    def initialize(credit_score:)
      validate_credit_score?(credit_score: credit_score)

      @credit_score = credit_score
    end

    private

    def validate_credit_score?(credit_score:)
      return true if credit_score.to_i.positive?

      raise ArgumentError,
            'person credit_score should be an even positive integer'
    end
  end
end
