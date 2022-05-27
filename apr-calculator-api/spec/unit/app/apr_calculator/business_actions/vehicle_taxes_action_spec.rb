# frozen_string_literal: true

describe AprCalculator::VehicleTaxesAction do
  context '#apply?' do
    subject { described_class.calculate(vehicle: vehicle) }

    context 'when no vehicle taxes applied' do
      let(:vehicle) { AprCalculator::Vehicle.new(year: 2019, mileage: 99_000) }
      it { expect(subject).to be_zero }
    end

    context 'tax for vehicle mileage and year' do
      let(:vehicle) { AprCalculator::Vehicle.new(year: 2013, mileage: 100_001) }
      it { expect(subject).to eql(3.0) }
    end

    context 'tax for vehicle mileage' do
      let(:vehicle) { AprCalculator::Vehicle.new(year: 2015, mileage: 100_001) }
      it { expect(subject).to eql(2.0) }
    end

    context 'tax for vehicle year' do
      let(:vehicle) { AprCalculator::Vehicle.new(year: 2014, mileage: 36) }
      it { expect(subject).to eql(1.0) }
    end
  end
end
