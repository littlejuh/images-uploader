# frozen_string_literal: true

module AprCalculator
  class RateCalculatorAction
    # rubocop:disable Metrics/AbcSize
    # rubocop:disable Metrics/MethodLength
    def self.calculate(term:, credit_score:)
      main_rules = [
        { rate: 4.75, term: TermRules.term_is_up_to_thirty_six?(term: term),
          credit_score: CreditScoreRules
            .credit_score_equal_seven_hundred_or_above?(credit_score: credit_score) },

        { rate: 5.75, term: TermRules.term_is_up_to_thirty_six?(term: term),
          credit_score: CreditScoreRules
            .credit_score_between_six_hundred_and_six_hundre_ninety_nine?(credit_score: credit_score) },

        { rate: 12.75, term: TermRules.term_is_up_to_thirty_six?(term: term),
          credit_score: CreditScoreRules
            .credit_score_below_six_hundred?(credit_score: credit_score) },

        { rate: 5.00, term: TermRules.term_is_up_to_forty_eight?(term: term),
          credit_score: CreditScoreRules
            .credit_score_equal_seven_hundred_or_above?(credit_score: credit_score) },

        { rate: 6.00, term: TermRules.term_is_up_to_forty_eight?(term: term),
          credit_score: CreditScoreRules
            .credit_score_between_six_hundred_and_six_hundre_ninety_nine?(credit_score: credit_score) },

        { rate: 13.25, term: TermRules.term_is_up_to_forty_eight?(term: term),
          credit_score: CreditScoreRules
            .credit_score_below_six_hundred?(credit_score: credit_score) },

        { rate: 5.50, term: TermRules.term_is_up_to_sixty?(term: term),
          credit_score: CreditScoreRules
            .credit_score_equal_seven_hundred_or_above?(credit_score: credit_score) },

        { rate: 6.65, term: TermRules.term_is_up_to_sixty?(term: term),
          credit_score: CreditScoreRules
            .credit_score_between_six_hundred_and_six_hundre_ninety_nine?(credit_score: credit_score) },

        { rate: 0, term: TermRules.term_is_up_to_sixty?(term: term),
          credit_score: CreditScoreRules
            .credit_score_below_six_hundred?(credit_score: credit_score) }
      ]
      main_rules.select { |rule| rule[:term] && rule[:credit_score] }.map { |r| r[:rate] }[0]
    end
    # rubocop:enable Metrics/AbcSize
    # rubocop:enable Metrics/MethodLength
  end
end
