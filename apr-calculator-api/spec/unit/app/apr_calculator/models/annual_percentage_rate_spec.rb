# frozen_string_literal: true

require 'spec_helper'

describe AprCalculator::AnnualPercentageRate do
  subject do
    described_class.new(loan: apr_request[:loan],
                        person: apr_request[:person],
                        vehicle: apr_request[:vehicle])
  end
  let(:apr_request) do
    {
      "loan": {
        "amount": 20_000,
        "term": 45
      },
      "person": {
        "creditScore": 400
      },
      "vehicle": {
        "year": 2019,
        "mileage": 444
      }
    }
  end

  context '#initialize' do
    let(:loan) { double(AprCalculator::Loan) }
    let(:person) { double(AprCalculator::Person) }
    let(:vehicle) { double(AprCalculator::Vehicle) }

    before do
      allow(AprCalculator::Loan).to receive(:new).and_return(loan)
      allow(AprCalculator::Person).to receive(:new).and_return(person)
      allow(AprCalculator::Vehicle).to receive(:new).and_return(vehicle)
    end

    it 'with valid parameters' do
      expect(subject.loan).to eql(loan)
      expect(subject.person).to eql(person)
      expect(subject.vehicle).to eql(vehicle)
    end
  end

  context '#initialize' do
    let(:person) { double(AprCalculator::Person) }
    let(:vehicle) { double(AprCalculator::Vehicle) }

    before do
      allow(AprCalculator::Person).to receive(:new).and_return(person)
      allow(AprCalculator::Vehicle).to receive(:new).and_return(vehicle)
      allow(AprCalculator::Loan).to receive(:new).and_raise(ArgumentError,
                                                            'amount should be an even positive integer')
    end

    it 'with invalid loan parameter' do
      expect { subject }.to raise_error(ArgumentError)
    end
  end

  context '#initialize' do
    let(:loan) { double(AprCalculator::Loan) }
    let(:vehicle) { double(AprCalculator::Vehicle) }

    let(:vehicleBuilder) { double(AprCalculator::Vehicle) }
    before do
      allow(AprCalculator::Loan).to receive(:new).and_return(loan)
      allow(AprCalculator::Vehicle).to receive(:new).and_return(vehicle)

      allow(AprCalculator::Person).to receive(:new).and_raise(ArgumentError,
                                                              'credit_score should be an even positive integer')
    end

    it 'with invalid person parameter' do
      expect { subject }.to raise_error(ArgumentError)
    end
  end

  context '#initialize' do
    let(:loan) { double(AprCalculator::Loan) }
    let(:person) { double(AprCalculator::Person) }

    let(:vehicleBuilder) { double(AprCalculator::Vehicle) }
    before do
      allow(loan).to receive(:new).and_return(loan)
      allow(person).to receive(:person).and_return(person)
      allow(AprCalculator::Vehicle).to receive(:new)
        .and_raise(ArgumentError, 'year should be an even positive integer and lower or equal than actual year')
    end

    it 'with invalid vehicle parameter' do
      expect { subject }.to raise_error(ArgumentError)
    end
  end
end
