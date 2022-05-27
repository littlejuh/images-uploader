# frozen_string_literal: true

require 'spec_helper'

describe AprCalculator::AprController do
  let(:app) { AprCalculator::AprController.new }
  let(:request_params) do
    {
      "loan": {
        "amount": 100_000,
        "term": 6
      },
      "person": {
        "creditScore": 700
      },
      "vehicle": {
        "year": 2014,
        "mileage": 36
      }
    }.to_json
  end

  context 'POST /rate argument error when invalid parameters' do
    let(:request_params) do
      {
        "person": {
          "creditScore": 700
        },
        "vehicle": {
          "year": 2014,
          "mileage": 36
        }
      }.to_json
    end
    let(:get_rate) { post '/rate', request_params }

    before do
      allow(AprCalculator::AnnualPercentageRateAction).to receive(:new).and_raise(ArgumentError,
                                                                                  'loan should be present')
    end

    it 'returns status 400 BadRequest' do
      expect(get_rate.status).to eq 400
    end

    it 'APR error response' do
      expected_response = '{"error":"loan should be present"}'
      expect(get_rate.body).to eq(expected_response)
    end
  end

  context 'POST /rate business error' do
    let(:get_rate) { post '/rate', request_params }
    let(:apr_action) { double(AprCalculator::AnnualPercentageRateAction) }
    before do
      allow(AprCalculator::AnnualPercentageRateAction).to receive(:new).and_return(apr_action)
      allow(apr_action).to receive(:validate?).and_raise(AprCalculator::BusinessValidationError,
                                                         'The min amount for loans up to 36 months is 5000')
    end

    it 'returns status 200 ok' do
      expect(get_rate.status).to eq 200
    end

    it 'APR error response' do
      expected_response = '{"error":"The min amount for loans up to 36 months is 5000"}'
      expect(get_rate.body).to eq(expected_response)
    end
  end

  context 'POST /rate successfully' do
    let(:get_rate) { post '/rate', request_params }
    let(:apr_action) { double(AprCalculator::AnnualPercentageRateAction) }
    let(:apr) { 5.75 }
    before do
      allow(AprCalculator::AnnualPercentageRateAction).to receive(:new).and_return(apr_action)
      allow(apr_action).to receive(:validate?).and_return(true)
      allow(apr_action).to receive(:calculate).and_return(apr)
    end

    it 'returns status 200 ok' do
      expect(get_rate.status).to eq 200
    end

    it 'APR response' do
      expected_response = '{"apr":5.75}'
      expect(get_rate.body).to eq(expected_response)
    end
  end
end
