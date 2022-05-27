## Annual Percentage Rate Calculation

This service has an endpoint `/apr-calculator/v1/rate` that returns the annual percentage rate (APR) for a vehicle loan.

##### Technologies used

```
node v12.18.3
```

```
typescript
```

```
serverless
```

```
jest
```

##### Solution

This api has an endpoint that is responsible for calculating the annual percentage rate for a vehicle loan. The flow starts with the `APRcalculatorController` where the endpoint is defined and validates the received request. The next step is to go through the `AnnualPercentageRateUsecase` class which is responsible for encapsulating the business flow. The first step in this flow is to go through `LoanAmountValidator` wich is reponsible to validate the amount received according to pre-established business rules according to the person's data. Next, the base rate is calculated in the `BaseRateCalculator` and then the taxes are applied in the `VehicleTaxesApplier`, if any, according to some validations of the vehicle data, ending the APR calculation flow.

---

##### Install node dependencies

```
npm install
```

---

##### Run application

```
npm run sls:start
```

---

##### Unit Tests

```
npm run test:unit
```

---

##### Integration Tests

Start local server

```
npm run sls:start
```

In another terminal window run the integration tests

```
npm run test:integration
```

---

##### Example

```
POST http://localhost:3000/local/apr-calculator/v1/rate
```

Successfull example of request body:

```
{
   "loan": {
      "amount": 10000,
      "term": 36
   },
   "person": {
      "creditScore": 700
   },
   "vehicle": {
      "year": 2014,
      "mileage": 36
   }
}

```

Response:

``` 
{"APR": 5.75}
```

Validation error example of request body:

```
{
    "loan": {
        "amount": 1000,
        "term": 36
    },
    "person": {
        "creditScore": 700
    },
    "vehicle": {
        "year": 2014,
        "mileage": -2
    }
}

```
Response:

```
{
    "code": "PayloadValidation",
    "message": "\"vehicle.mileage\" must be a positive number"
}
```

Business validation error example of request body:

```
{
    "loan": {
       "amount": 4000,
       "term": 36
    },
    "person": {
       "creditScore": 700
    },
    "vehicle": {
       "year": 2014,
       "mileage": 1000
    }
 }

```

Response:

```
{
    "code": "BusinessValidation",
    "message": "The minimum loan amount for loans up to 36 months is $ 5,000"
}
```