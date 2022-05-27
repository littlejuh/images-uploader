# frozen_string_literal: true

require 'spec_helper'
describe AprCalculator::RateCalculatorAction do
  context '#calculate?' do
    subject { described_class.calculate(term: term, credit_score: credit_score) }

    context '4.75 for a loan term up to 36 months and credit score equal or more than 700' do
      let(:term) { 36 }
      let(:credit_score) { 700 }
      it { expect(subject).to eql(4.75) }
    end

    context '5.75 for a loan term up to 36 months and credit score between 600 and 699' do
      let(:term) { 36 }
      let(:credit_score) { 699 }
      it { expect(subject).to eql(5.75) }
    end

    context '12.75 for a loan term up to 36 months and credit score less than 600' do
      let(:term) { 36 }
      let(:credit_score) { 500 }
      it { expect(subject).to eql(12.75) }
    end

    context '5.00 for a loan term up to 48 months and credit score equal or more than 700' do
      let(:term) { 48 }
      let(:credit_score) { 700 }
      it { expect(subject).to eql(5.0) }
    end

    context '6.00 for a loan term up to 48 months and credit score between 600 and 699' do
      let(:term) { 48 }
      let(:credit_score) { 601 }
      it { expect(subject).to eql(6.0) }
    end

    context '13.25 for a loan term up to 48 months and credit score less than 600' do
      let(:term) { 48 }
      let(:credit_score) { 500 }
      it { expect(subject).to eql(13.25) }
    end

    context '13.25 for a loan term up to 48 months and credit score less than 600' do
      let(:term) { 48 }
      let(:credit_score) { 500 }
      it { expect(subject).to eql(13.25) }
    end

    context '5.50 for a loan term up to 60 months and credit score equal or more than 700' do
      let(:term) { 60 }
      let(:credit_score) { 701 }
      it { expect(subject).to eql(5.5) }
    end

    context '6.65 for a loan term up to 60 months and credit score between 600 and 699' do
      let(:term) { 60 }
      let(:credit_score) { 659 }
      it { expect(subject).to eql(6.65) }
    end

    context '0 for a loan term up to 60 months and credit score less than 600' do
      let(:term) { 60 }
      let(:credit_score) { 500 }
      it { expect(subject).to be_zero }
    end
  end
end
