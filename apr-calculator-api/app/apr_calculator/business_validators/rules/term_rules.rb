# frozen_string_literal: true

module AprCalculator
  class TermRules
    def self.term_is_up_to_thirty_six?(term:)
      term <= 36
    end

    def self.term_is_up_to_forty_eight?(term:)
      !term_is_up_to_thirty_six?(term: term) && term <= 48
    end

    def self.term_is_up_to_sixty?(term:)
      term > 48 && term <= 60
    end
  end
end
