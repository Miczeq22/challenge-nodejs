Sharespace coding task - Node.js developer
===

Based on [NestJS](https://github.com/nestjs/nest) framework.


The project is set up for development so you don't need to spend time on configuration, just focus on the actual application code.
However, feel free finding improvements, suggestions, installing new dependencies or adding infrastructure building blocks. 

## Introduction

### Adopted techniques and principles

- CQRS
- Some influence of Uncle Bob's Clean Architecture

### Installation
```
git clone https://github.com/ShareSpace-work/challenge-nodejs.git
cd challenge-nodejs/
yarn
```

### Running the app
```
yarn start:dev
```

### Running tests
```
yarn test
```

## The task

Model simple backend for the desks reservation. The solution should have the following public API:
- desks reservation
- availability checking

Invariants:
- Desks can be reserved for full days only
- Desks should be reserved with 1 day notice
- Each reservation should have one of these statuses: CONFIRMED, PAID
- Single user can reserve one desk at a time

Enjoy! 

Publish your solution as a public Github repository within 7 days after receiving this assignment.
Do not hesitate to contact us anytime you have a question.