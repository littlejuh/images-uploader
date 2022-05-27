# frozen_string_literal: true

require 'spec_helper'

describe AprCalculator::AmountRules do
  context '#min_five_thousand?' do
    let(:amount) { 5000 }
    subject { described_class.min_five_thousand?(amount: amount) }
    context 'when min_five_thousand is valid' do
      it { expect(subject).to be_truthy }
    end

    context 'when invalid min_five_thousand' do
      let(:amount) { 4000 }
      it { expect(subject).to be_falsey }
    end
  end

  context '#min_ten_thousand?' do
    let(:amount) { 10_000 }
    subject { described_class.min_ten_thousand?(amount: amount) }
    context 'when min_ten_housand is valid' do
      it { expect(subject).to be_truthy }
    end

    context 'when invalid min_ten_housand' do
      let(:amount) { 4000 }
      it { expect(subject).to be_falsey }
    end
  end

  context '#min_fifteen_thousand?' do
    let(:amount) { 15_000 }
    subject { described_class.min_fifteen_thousand?(amount: amount) }
    context 'when min_fifteen_thousand is valid' do
      it { expect(subject).to be_truthy }
    end

    context 'when invalid min_fifteen_thousand' do
      let(:amount) { 4000 }
      it { expect(subject).to be_falsey }
    end
  end

  context '#max_fifty_thousand?' do
    let(:amount) { 50_000 }
    subject { described_class.max_fifty_thousand?(amount: amount) }
    context 'when max_fifty_thousand is valid' do
      it { expect(subject).to be_truthy }
    end

    context 'when invalid max_fifty_thousand' do
      let(:amount) { 50_002 }
      it { expect(subject).to be_falsey }
    end
  end

  context '#max_seventy_five_thousand?' do
    let(:amount) { 75_000 }
    subject { described_class.max_seventy_five_thousand?(amount: amount) }
    context 'when max_seventy_five_thousand is valid' do
      it { expect(subject).to be_truthy }
    end

    context 'when invalid max_seventy_five_thousand' do
      let(:amount) { 75_002 }
      it { expect(subject).to be_falsey }
    end
  end

  context '#max_hundred_thousand?' do
    let(:amount) { 100_000 }
    subject { described_class.max_hundred_thousand?(amount: amount) }
    context 'when max_hundred_thousand is valid' do
      it { expect(subject).to be_truthy }
    end

    context 'when invalid max_hundred_thousand' do
      let(:amount) { 100_002 }
      it { expect(subject).to be_falsey }
    end
  end
end
