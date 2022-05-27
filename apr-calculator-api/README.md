#  Annual percentage rate (APR) for a vehicle loan

## Context
This project implements the following functionalities:
- HTTP endpoint `/rate` that returns the annual percentage rate (APR) for a vehicle loan

The api has single endpoint to calculates the APR for a vehicle loan. The flow starts in `AprController` and has entrypoint `/rate`(if you try other endpoint the api should return 404 not_found) 
This entrypoint defined, receive the request, them call the actions to validates and calculate the APR 
“Truth can only be found in one place: the code.” – Robert C. Martin, Clean Code

### Business assumptions
0. Base rate table provided was considered to calculate taxes
1. The minimum loan amount for loans up to 36 months is $ 5,000
2. The minimum loan amount for loans up to 48 months is $ 10,000
3. The minimum loan amount for loans up to 60 months is $ 15,000
4. The maximum loan amount for a credit score equal to 700 or above is $ 100,000
5. The maximum loan amount for a credit score between 600 and 699 is $ 75,000
6. The maximum loan amount for a credit score below 600 is $ 50,000
7. If the vehicle year is before 2015, the base rate should be increased by 1.00%
8. If the vehicle mileage is over 100,000, the base rate should be increased by 2.00%

##### Example of successfully request 
POST(Headers: Content-Type=application/json)
Body:
```json
{
   "loan": {
      "amount": 10000,
      "term": 36
   },
   "person": {
      "credit_score": 500
   },
   "vehicle": {
      "year": 2015,
      "mileage": 36
   }
}
```
##### Example of response(200 OK)
Body:
```json
{"apr":12.75}
```
##### Example of request with error 
POST(Headers: Content-Type=application/json)
Body:
```json
{
   "person": {
      "creditScore": 700
   },
   "vehicle": {
      "year": 2014,
      "mileage": 36
   }
}
```
##### Example of response(400 bad request)
Body:
```json
{"error":"loan should be present"}
```

## Getting Started
### Dependencies
If you don't want install all dependencies, you just need [Docker](https://www.docker.com/ "docker") running in your machine

Also you can run using these installed dependencies:
- [Ruby >= 3.0.0](https://ruby-doc.org/ "ruby")
  - gems: [sinatra](https://rubygems.org/gems/sinatra "sinatra"), [require_all](https://rubygems.org/gems/require_all "require_all"), [sinatra-cross_origin](https://rubygems.org/gems/sinatra-cross_origin/versions/0.4.0 "sinatra-cross_origin"), [thin](https://rubygems.org/gems/thin "thin"), [rack-test](https://rubygems.org/gems/rack-test  "rack-test"), [rspec](https://rspec.info/ "rspec"), [rubocop](https://github.com/rubocop/rubocop, "rubocop")
- [Bundler package manager](https://bundler.io/ "bundler")

---
## Setup
- In your fav console, goes to the api folder following these next steps:
  - `cd apr-calculator-api`

### Run using Docker
- Build(install dependencies):
  - `make docker-build`
- Run AprCalculator application(in :9292 port):
  - `make docker-run`
- Run tests:
  - `make docker-test`
- Run static analysis(rubocop w/ automatic fix):
  - `make docker-lint`  

### Run
- Build(install dependencies):
  - `make build`
- Run AprCalculator application(in :9292 port):
  - `make run`
- Run tests
  - `make test`
- Run static analysis(rubocop w/ automatic fix):
  - `make lint`
