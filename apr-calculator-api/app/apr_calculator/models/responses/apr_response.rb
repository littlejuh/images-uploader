# frozen_string_literal: true

module AprCalculator
  class AprResponse
    attr_reader :apr

    def initialize(apr:)
      @apr = apr
    end
  end
end
