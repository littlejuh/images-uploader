# frozen_string_literal: true

module AprCalculator
  class AprController < Sinatra::Base
    register Sinatra::CrossOrigin

    configure do
      enable :logging
      enable :cross_origin
      set :allow_origin, '*'
      set :allow_methods, %i[post]
      set :expose_headers, ['Content-Type']
    end

    options '*' do
      response.headers['Allow'] = 'POST'
      response.headers['Access-Control-Allow-Headers'] =
        'X-Requested-With, X-HTTP-Method-Override, Content-Type, Cache-Control, Accept'
      404
    end

    post '/rate' do
      payload = JSON.parse(request.body.read, object_class: OpenStruct)
      status 200
      begin
        apr = AnnualPercentageRateAction.new(params: payload)
        apr.validate?
        AprSerializer.serialize(apr: apr.calculate)
      rescue ArgumentError => e
        status 400
        ErrorSerializer.serialize(error:
          ErrorResponse.new(error: e.message).error)
      rescue BusinessValidationError => e
        ErrorSerializer.serialize(error:
          ErrorResponse.new(error: e.message).error)
      end
    end
  end
end
