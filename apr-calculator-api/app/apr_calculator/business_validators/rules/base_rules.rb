# frozen_string_literal: true

module AprCalculator
  class BaseRules
    def self.the_min_amount_for_loans_up_thirty_six_months_is_five_thousand?(amount:, term:)
      AmountRules.min_five_thousand?(amount: amount) &&
        TermRules.term_is_up_to_thirty_six?(term: term)
    end

    def self.the_min_amount_for_loans_up_forty_eight_months_is_ten_thousand?(amount:, term:)
      AmountRules.min_ten_thousand?(amount: amount) &&
        TermRules.term_is_up_to_forty_eight?(term: term)
    end

    def self.the_min_amount_for_loans_up_sixty_months_is_fifteen_thousand?(amount:, term:)
      AmountRules.min_fifteen_thousand?(amount: amount) &&
        TermRules.term_is_up_to_sixty?(term: term)
    end

    def self.the_max_amount_credit_score_equal_seven_hundred_or_above_is_hundred_thousand?(amount:, credit_score:)
      AmountRules
        .max_hundred_thousand?(amount: amount) &&
        CreditScoreRules
          .credit_score_equal_seven_hundred_or_above?(credit_score: credit_score)
    end

    def self.the_max_score_between_six_hundred_and_six_hundre_ninety_nine_is_seventy_five_thousand?(amount:,
                                                                                                    credit_score:)
      AmountRules
        .max_seventy_five_thousand?(amount: amount) &&
        CreditScoreRules
          .credit_score_between_six_hundred_and_six_hundre_ninety_nine?(credit_score: credit_score)
    end

    def self.the_max_amount_credit_core_below_six_hundred_is_fifty_thousand?(amount:, credit_score:)
      AmountRules
        .max_fifty_thousand?(amount: amount) &&
        CreditScoreRules
          .credit_score_below_six_hundred?(credit_score: credit_score)
    end
  end
end
