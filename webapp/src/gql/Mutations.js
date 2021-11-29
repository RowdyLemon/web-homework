import { gql } from '@apollo/client'

export const DELETE_TRANSACTION = gql`
  mutation DeleteTransaction($id: String) {
    deleteTransaction(id: $id) {
      id
    }
  }
`

export const CREATE_TRANSACTION = gql`
  mutation CreateTransaction(
    $user_id: String
    $description: String
    $merchant_id: String
    $debit: Boolean
    $credit: Boolean
    $amount: Float
  ) {
    addTransaction(
      user_id: $user_id
      description: $description
      merchant_id: $merchant_id
      debit: $debit
      credit: $credit
      amount: $amount
    ) {
      user_id
      description
      merchant_id
      debit
      credit
      amount
    }
  }
`

export const UPDATE_TRANSACTION = gql`
  mutation UpdateTransaction(
    $id: String!
    $user_id: String
    $description: String
    $merchant_id: String
    $debit: Boolean
    $credit: Boolean
    $amount: Float
  ) {
    updateTransaction(
      id: $id
      user_id: $user_id
      description: $description
      merchant_id: $merchant_id
      debit: $debit
      credit: $credit
      amount: $amount
    ) {
      id
      user_id
      description
      merchant_id
      debit
      credit
      amount
    }
  }
`

export const ADD_TRANSACTIONS = gql`
  mutation AddTransactions($transactions: [transactionInput]) {
    addTransactions(transactions: $transactions) {
      id
      user_id
      description
      merchant_id
      debit
      credit
      amount
    }
  }
`

export const ADD_USERS = gql`
  mutation AddUsers($users: [userInput]) {
    addUsers(users: $users) {
      id
      first_name
      last_name
      dob
    }
  }
`

export const ADD_MERCHANTS = gql`
  mutation AddMerchants($merchants: [merchantInput]) {
    addMerchants(merchants: $merchants) {
      id
      name
    }
  }
`
