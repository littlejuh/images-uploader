# frozen_string_literal: true

module AprCalculator
  class LoanValidator
    def self.valid?(loan:)
      if min_amount_for_loans_up_to_thirtysix_months_is_five_thousand?(loan: loan)
        raise BusinessValidationError, 'The min amount for loans up to 36 months is 5000'
      end
      if min_amount_for_loans_up_to_forty_eight_months_is_ten_thousand?(loan: loan)
        raise BusinessValidationError, 'The min amount for loans up to 48 months is 10000'
      end
      if min_amount_for_loans_up_to_sixty_months_is_fifteen_thousand?(loan: loan)
        raise BusinessValidationError, 'The min amount for loans up to 60 months is 15000'
      end

      true
    end

    def self.min_amount_for_loans_up_to_thirtysix_months_is_five_thousand?(loan:)
      (TermRules.term_is_up_to_thirty_six?(term: loan.term) &&
      !BaseRules.the_min_amount_for_loans_up_thirty_six_months_is_five_thousand?(
        amount: loan.amount, term: loan.term
      ))
    end

    def self.min_amount_for_loans_up_to_forty_eight_months_is_ten_thousand?(loan:)
      (TermRules.term_is_up_to_forty_eight?(term: loan.term) &&
    !BaseRules.the_min_amount_for_loans_up_forty_eight_months_is_ten_thousand?(
      amount: loan.amount, term: loan.term
    ))
    end

    def self.min_amount_for_loans_up_to_sixty_months_is_fifteen_thousand?(loan:)
      (TermRules.term_is_up_to_sixty?(term: loan.term) &&
      !BaseRules.the_min_amount_for_loans_up_sixty_months_is_fifteen_thousand?(
        amount: loan.amount, term: loan.term
      ))
    end
  end
end
