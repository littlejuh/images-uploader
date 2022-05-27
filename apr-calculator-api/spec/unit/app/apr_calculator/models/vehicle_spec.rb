# frozen_string_literal: true

require 'spec_helper'

describe AprCalculator::Vehicle do
  context '#initialize' do
    let(:year) { 2020 }
    let(:mileage) { 2000 }
    subject { described_class.new(year: year, mileage: mileage) }
    it 'with valid parameters' do
      expect(subject.year).to eql(year)
      expect(subject.mileage).to eql(mileage)
    end
  end
  context '#initialize' do
    let(:year) { 2030 }
    let(:mileage) { 2000 }
    subject { described_class.new(year: year, mileage: mileage) }
    it 'with greater than actual year parameter' do
      expect { subject }.to raise_error(ArgumentError)
    end
  end

  context '#initialize' do
    let(:year) { -2030 }
    let(:mileage) { 2000 }
    subject { described_class.new(year: year, mileage: mileage) }
    it 'with invalid year parameter' do
      expect { subject }.to raise_error(ArgumentError)
    end
  end

  context '#initialize' do
    let(:year) { 2020 }
    let(:mileage) { -2000 }
    subject { described_class.new(year: year, mileage: mileage) }
    it 'with invalid mileage parameter' do
      expect { subject }.to raise_error(ArgumentError)
    end
  end
end
