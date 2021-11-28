const graphql = require('graphql')
const { GraphQLObjectType, GraphQLString, GraphQLBoolean, GraphQLFloat } = graphql
const { TransactionModel } = require('../data-models/Transaction')
const TransactionType = require('./transaction-type')

const { UserModel } = require('../data-models/User')
const UserType = require('./user-type')

const { MerchantModel } = require('../data-models/Merchant')
const MerchantType = require('./merchant-type')

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addTransaction: {
      type: TransactionType,
      args: {
        user_id: { type: GraphQLString },
        description: { type: GraphQLString },
        merchant_id: { type: GraphQLString },
        debit: { type: GraphQLBoolean },
        credit: { type: GraphQLBoolean },
        amount: { type: GraphQLFloat }
      },
      /* eslint-disable-next-line camelcase */
      resolve (parentValue, { user_id, description, merchant_id, debit, credit, amount }) {
        return (new TransactionModel({ user_id, description, merchant_id, debit, credit, amount })).save()
      }
    },
    addUser: {
      type: UserType,
      args: {
        first_name: { type: GraphQLString },
        last_name: { type: GraphQLString },
        dob: { type: GraphQLString }
      },
      // eslint-disable-next-line camelcase
      resolve (parentValue, { first_name, last_name, dob }) {
        return (new UserModel({ first_name, last_name, dob })).save()
      }
    },
    addMerchant: {
      type: MerchantType,
      args: {
        name: { type: GraphQLString }
      },
      resolve (parentValue, { name }) {
        return (new MerchantModel({ name })).save()
      }
    }
  }
})

module.exports = mutation
