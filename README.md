# NodeJS Challenge

![Build](https://github.com/cjcbusatto/rocketseat-studies-nodejs-challenge/workflows/Build%20process/badge.svg?branch=master)

## 🚀 Introduction

In this challenge, you should develop a simple application using Typescript to store income and outcome transactions.

## Application Features

- Create a transaction
  - The route `POST /transactions` should receive a `title`, `value` and `type` in the request body and create a new transaction including an `id` which should be an UUID.
- List the transactions
  - The route `GET /transactions` should return an object containing the list of transactions and the current balance as the following:
    ```js
    {
      "transactions": [ Transaction ],
      "balance": {
        "income": number,
        "outcome": number,
        "total": number
      }
    }
    ```
