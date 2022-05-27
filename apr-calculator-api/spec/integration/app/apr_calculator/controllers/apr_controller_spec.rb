# frozen_string_literal: true

require 'spec_helper'

describe AprCalculator::AprController do
  let(:app) { AprCalculator::AprController.new }

  context 'POST /other not found error' do
    let(:get_other) { post '/other' }

    it 'returns status 404' do
      expect(get_other.status).to eq 404
    end
  end

  context 'POST /rate successfully' do
    let(:request_params) do
      {
        "loan": {
          "amount": 100_000,
          "term": 6
        },
        "person": {
          "credit_score": 700
        },
        "vehicle": {
          "year": 2014,
          "mileage": 36
        }
      }.to_json
    end
    let(:get_rate) { post '/rate', request_params }

    it 'returns status 200 ok' do
      expect(get_rate.status).to eq 200
    end

    it 'APR response' do
      expected_response = '{"apr":5.75}'
      expect(get_rate.body).to eq(expected_response)
    end
  end

  context 'POST /rate business error' do
    let(:request_params) do
      {
        "loan": {
          "amount": 2000,
          "term": 50
        },
        "person": {
          "credit_score": 700
        },
        "vehicle": {
          "year": 2021,
          "mileage": 36
        }
      }.to_json
    end
    let(:get_rate) { post '/rate', request_params }

    it 'returns status 200 ok' do
      expect(get_rate.status).to eq 200
    end

    it 'APR error response' do
      expected_response = '{"error":"The min amount for loans up to 60 months is 15000"}'
      expect(get_rate.body).to eq(expected_response)
    end
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

    it 'returns status 400 BadRequest' do
      expect(get_rate.status).to eq 400
    end

    it 'APR error response' do
      expected_response = '{"error":"loan should be present"}'
      expect(get_rate.body).to eq(expected_response)
    end
  end
end
