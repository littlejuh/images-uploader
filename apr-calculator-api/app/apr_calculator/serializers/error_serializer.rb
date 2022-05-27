# frozen_string_literal: true

module AprCalculator
  class ErrorSerializer
    def self.serialize(error:)
      { error: error }.to_json
    end
  end
end
