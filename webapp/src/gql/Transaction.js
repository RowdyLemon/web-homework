import { shape, string, bool, number } from 'prop-types'

export const Transaction = {
  shape: shape({
    id: string,
    user_id: string,
    description: string,
    merchant_id: string,
    debit: bool,
    credit: bool,
    amount: number
  })
}
