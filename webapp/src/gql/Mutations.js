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
