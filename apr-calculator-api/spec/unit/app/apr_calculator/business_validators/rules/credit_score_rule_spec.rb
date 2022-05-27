# frozen_string_literal: true

require 'spec_helper'

describe AprCalculator::CreditScoreRules do
  context '#credit_score_between_six_hundred_and_six_hundre_ninety_nine?' do
    let(:credit_score) { 680 }
    subject { described_class.credit_score_between_six_hundred_and_six_hundre_ninety_nine?(credit_score: credit_score) }
    context 'when credit_score_between_six_hundred_and_six_hundre_ninety_nine is valid' do
      it { expect(subject).to be_truthy }
    end

    context 'when invalid credit_score_between_six_hundred_and_six_hundre_ninety_nine' do
      let(:credit_score) { 700 }
      it { expect(subject).to be_falsey }
    end
  end

  context '#credit_score_equal_seven_hundred_or_above?' do
    let(:credit_score) { 700 }
    subject { described_class.credit_score_equal_seven_hundred_or_above?(credit_score: credit_score) }
    context 'when credit_score_equal_seven_hundred_or_above is valid' do
      it { expect(subject).to be_truthy }
    end

    context 'when invalid credit_score_equal_seven_hundred_or_above' do
      let(:credit_score) { 602 }
      it { expect(subject).to be_falsey }
    end
  end

  context '#credit_score_below_six_hundred?' do
    let(:credit_score) { 499 }
    subject { described_class.credit_score_below_six_hundred?(credit_score: credit_score) }
    context 'when credit_score_below_six_hundred is valid' do
      it { expect(subject).to be_truthy }
    end

    context 'when invalid credit_score_below_six_hundred' do
      let(:credit_score) { 602 }
      it { expect(subject).to be_falsey }
    end
  end
end
