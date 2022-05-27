# frozen_string_literal: true

require 'spec_helper'

describe AprCalculator::Loan do
  context '#initialize' do
    let(:amount) { 4000 }
    let(:term) { 22 }
    subject { described_class.new(amount: amount, term: term) }
    it 'with valid parameters' do
      expect(subject.amount).to eql(amount)
      expect(subject.term).to eql(term)
    end
  end

  context '#initialize' do
    let(:amount) { -4000 }
    let(:term) { 22 }
    subject { described_class.new(amount: amount, term: term) }
    it 'with invalid amount parameter' do
      expect { subject }.to raise_error(ArgumentError)
    end
  end

  context '#initialize' do
    let(:amount) { 4000 }
    let(:term) { -22 }
    subject { described_class.new(amount: amount, term: term) }
    it 'with invalid term parameter' do
      expect { subject }.to raise_error(ArgumentError)
    end
  end
end
