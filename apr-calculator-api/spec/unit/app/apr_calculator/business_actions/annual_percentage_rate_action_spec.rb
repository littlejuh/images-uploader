# frozen_string_literal: true

require 'spec_helper'
describe AprCalculator::AnnualPercentageRateAction do
  let(:amount) { 10_000 }
  let(:term) { 36 }
  let(:credit_score) { 700 }
  let(:year) { 2017 }
  let(:mileage) { 35 }
  let(:params) do
    {
      "loan": {
        "amount": amount,
        "term": term
      },
      "person": {
        "credit_score": credit_score
      },
      "vehicle": {
        "year": year,
        "mileage": mileage
      }
    }
  end

  context '#initialize' do
    let(:apr) do
      AprCalculator::AnnualPercentageRate.new(loan: params[:loan], person: params[:person], vehicle: params[:vehicle])
    end

    subject { described_class.new(params: params) }

    before do
      allow(AprCalculator::AnnualPercentageRate).to receive(:new).with(loan: params[:loan],
                                                                       person: params[:person],
                                                                       vehicle: params[:vehicle]).and_return(apr)
    end
    it 'build annual percentage rate successfully' do
      expect(subject.annual_percentage_rate.loan.amount).to eql(amount)
      expect(subject.annual_percentage_rate.loan.term).to eql(term)
      expect(subject.annual_percentage_rate.person.credit_score).to eql(credit_score)
      expect(subject.annual_percentage_rate.vehicle.year).to eql(year)
      expect(subject.annual_percentage_rate.vehicle.mileage).to eql(mileage)
    end
  end

  context '#initialize' do
    let(:params) do
      {
        "person": {
          "credit_score": credit_score
        },
        "vehicle": {
          "year": year,
          "mileage": mileage
        }
      }
    end

    subject { described_class.new(params: params) }

    before do
      allow(AprCalculator::AnnualPercentageRate).to receive(:new).and_raise(ArgumentError, 'loan should be present')
    end
    it 'error to build annual percentage rate' do
      expect { subject }.to raise_error(ArgumentError, 'loan should be present')
    end
  end

  context '#initialize' do
    let(:params) do
      {
        "loan": {
          "amount": amount,
          "term": term
        },
        "person": {
          "credit_score": credit_score
        }
      }
    end

    subject { described_class.new(params: params) }

    before do
      allow(AprCalculator::AnnualPercentageRate).to receive(:new)
        .and_raise(ArgumentError, 'vehicle should be present')
    end
    it 'error to build annual percentage rate' do
      expect { subject }.to raise_error(ArgumentError, 'vehicle should be present')
    end
  end

  context '#initialize' do
    let(:params) do
      {
        "loan": {
          "amount": amount,
          "term": term
        },
        "vehicle": {
          "year": year,
          "mileage": mileage
        }
      }
    end

    subject { described_class.new(params: params) }

    before do
      allow(AprCalculator::AnnualPercentageRate).to receive(:new)
        .and_raise(ArgumentError, 'person should be present')
    end
    it 'error to build annual percentage rate' do
      expect { subject }.to raise_error(ArgumentError, 'person should be present')
    end
  end

  context '#validate?' do
    let(:amount) { 3_000 }
    let(:annual_percentage_rate_action) do
      described_class.new(params: params)
    end

    subject { annual_percentage_rate_action.validate? }

    before do
      allow(AprCalculator::LoanValidator).to receive(:valid?).and_return(true)
    end
    it 'successfully' do
      expect(subject).to be_truthy
    end
  end

  context '#validate?' do
    let(:annual_percentage_rate_action) do
      described_class.new(params: params)
    end

    subject { annual_percentage_rate_action.validate? }

    before do
      allow(AprCalculator::LoanValidator).to receive(:valid?)
        .and_raise(AprCalculator::BusinessValidationError, 'The min amount for loans up to 36 months is 5000')
    end
    it 'error to validate' do
      expect do
        subject
      end.to raise_error(AprCalculator::BusinessValidationError,
                         'The min amount for loans up to 36 months is 5000')
    end
  end

  context '#calculate' do
    let(:annual_percentage_rate_action) do
      described_class.new(params: params)
    end

    subject { annual_percentage_rate_action.calculate }

    before do
      allow(AprCalculator::RateCalculatorAction).to receive(:calculate).with(term:
        annual_percentage_rate_action.annual_percentage_rate.loan.term, credit_score:
                                                                             annual_percentage_rate_action
                                                                             .annual_percentage_rate
                                                                             .person
                                                                             .credit_score)
                                                                       .and_return(4.75)

      allow(AprCalculator::VehicleTaxesAction).to receive(:calculate).with(vehicle:
        annual_percentage_rate_action.annual_percentage_rate.vehicle).and_return(0)
    end
    it 'successfully with no taxes' do
      expect(subject).to eql(4.75)
    end
  end

  context '#calculate' do
    let(:annual_percentage_rate_action) do
      described_class.new(params: params)
    end

    subject { annual_percentage_rate_action.calculate }

    before do
      allow(AprCalculator::RateCalculatorAction).to receive(:calculate).with(term:
        annual_percentage_rate_action.annual_percentage_rate.loan.term, credit_score:
        annual_percentage_rate_action.annual_percentage_rate.person.credit_score)
                                                                       .and_return(4.75)
      allow(AprCalculator::VehicleTaxesAction).to receive(:calculate).with(vehicle:
        annual_percentage_rate_action.annual_percentage_rate.vehicle).and_return(1.0)
    end
    it 'successfully with taxes' do
      expect(subject).to eql(5.75)
    end
  end
end
