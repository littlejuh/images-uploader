# frozen_string_literal: true

require 'spec_helper'

describe AprCalculator::TermRules do
  context '#term_is_up_to_thirty_six?' do
    let(:term) { 36 }
    subject { described_class.term_is_up_to_thirty_six?(term: term) }
    context 'when term_is_up_to_thirty_six is valid' do
      it { expect(subject).to be_truthy }
    end

    context 'when invalid term_is_up_to_thirty_six' do
      let(:term) { 40 }
      it { expect(subject).to be_falsey }
    end
  end

  context '#term_is_up_to_forty_eight?' do
    let(:term) { 40 }
    subject { described_class.term_is_up_to_forty_eight?(term: term) }
    context 'when term_is_up_to_forty_eight is valid' do
      it { expect(subject).to be_truthy }
    end

    context 'when invalid term_is_up_to_forty_eight' do
      let(:term) { 55 }
      it { expect(subject).to be_falsey }
    end
  end

  context '#term_is_up_to_sixty?' do
    let(:term) { 50 }
    subject { described_class.term_is_up_to_sixty?(term: term) }
    context 'when term_is_up_to_sixty is valid' do
      it { expect(subject).to be_truthy }
    end

    context 'when invalid term_is_up_to_sixty' do
      let(:term) { 66 }
      it { expect(subject).to be_falsey }
    end
  end
end
