# frozen_string_literal: true

module AprCalculator
  class AprSerializer
    def self.serialize(apr:)
      { apr: apr }.to_json
    end
  end
end
