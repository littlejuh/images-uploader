# frozen_string_literal: true

module AprCalculator
  class CreditScoreRules
    def self.credit_score_between_six_hundred_and_six_hundre_ninety_nine?(credit_score:)
      credit_score >= 600 && credit_score <= 699
    end

    def self.credit_score_equal_seven_hundred_or_above?(credit_score:)
      credit_score >= 700
    end

    def self.credit_score_below_six_hundred?(credit_score:)
      credit_score < 600
    end
  end
end
