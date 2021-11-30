import { gql } from '@apollo/client'

export const DELETE_TRANSACTION = gql`
  mutation DeleteTransaction($id: String) {
    deleteTransaction(id: $id) {
      id
    }
  }
`

export const DELETE_USER = gql`
  mutation DeleteUser($id: String) {
    deleteUser(id: $id) {
      id
    }
  }
`

export const DELETE_MERCHANT = gql`
  mutation DeleteMerchant($id: String) {
    deleteMerchant(id: $id) {
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

export const UPDATE_USER = gql`
  mutation UpdateUser(
    $id: String!
    $first_name: String
    $last_name: String
    $dob: String
  ) {
    updateUser(
      id: $id
      first_name: $first_name
      last_name: $last_name
      dob: $dob
    ) {
      id
      first_name
      last_name
      dob
    }
  }
`

export const UPDATE_MERCHANT = gql`
  mutation UpdateMerchant($id: String!, $name: String) {
    updateMerchant(id: $id, name: $name) {
      id
      name
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

export const ADD_USER = gql`
  mutation AddUser(
    $first_name: String,
    $last_name: String,
    $dob: String
  ) {
    addUser(
      first_name: $first_name,
      last_name: $last_name,
      dob: $dob
    ) {
      id
      first_name
      last_name
      dob
    }
  }
`

export const ADD_MERCHANT = gql`
  mutation AddMerchant($name: String) {
    addMerchant(name: $name) {
      id
      name
    }
  }
`
