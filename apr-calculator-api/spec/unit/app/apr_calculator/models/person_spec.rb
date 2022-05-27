# frozen_string_literal: true

require 'spec_helper'

describe AprCalculator::Person do
  context '#initialize' do
    let(:credit_score) { 7 }
    subject { described_class.new(credit_score: credit_score) }
    it 'with valid credit score parameter' do
      expect(subject.credit_score).to eql(credit_score)
    end
  end
  context '#initialize' do
    let(:credit_score) { -7 }
    subject { described_class.new(credit_score: credit_score) }
    it 'with invalid credit score parameter' do
      expect { subject }.to raise_error(ArgumentError)
    end
  end
end
