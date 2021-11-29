/* eslint-disable camelcase */
const graphql = require('graphql')
const mongoose = require('mongoose')
const { GraphQLObjectType, GraphQLString, GraphQLBoolean, GraphQLFloat } = graphql
const { TransactionModel } = require('../data-models/Transaction')
const TransactionType = require('./transaction-type')

const { UserModel } = require('../data-models/User')
const UserType = require('./user-type')

const { MerchantModel } = require('../data-models/Merchant')
const MerchantType = require('./merchant-type')

const { packageModel } = require('../query-resolvers/utils.js')

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
      resolve (parentValue, { user_id, description, merchant_id, debit, credit, amount }) {
        return (new TransactionModel({ user_id, description, merchant_id, debit, credit, amount })).save()
      }
    },
    updateTransaction: {
      type: TransactionType,
      args: {
        id: { type: new graphql.GraphQLNonNull(GraphQLString) },
        user_id: { type: GraphQLString },
        description: { type: GraphQLString },
        merchant_id: { type: GraphQLString },
        debit: { type: GraphQLBoolean },
        credit: { type: GraphQLBoolean },
        amount: { type: GraphQLFloat }
      },
      resolve (parentValue, { id, user_id, description, merchant_id, debit, credit, amount }) {
        return TransactionModel.updateOne(
          { _id: mongoose.Types.ObjectId(id) },
          {
            $set: {
              ...(user_id && { user_id }),
              ...(description && { description }),
              ...(merchant_id && { merchant_id }),
              ...(typeof (debit) === 'boolean' && { debit }),
              ...(typeof (credit) === 'boolean' && { credit }),
              ...(amount && { amount })
            }
          }
        ).exec().then(() => TransactionModel.findOne({ _id: mongoose.Types.ObjectId(id) }).exec().then(transaction => packageModel(transaction)[0]))
      }
    },
    deleteTransaction: {
      type: TransactionType,
      args: {
        id: { type: GraphQLString }
      },
      resolve (parentValue, { id }) {
        TransactionModel.deleteOne({ _id: mongoose.Types.ObjectId(id) }).exec()
        return { id: mongoose.Types.ObjectId(id) }
      }
    },
    addUser: {
      type: UserType,
      args: {
        first_name: { type: GraphQLString },
        last_name: { type: GraphQLString },
        dob: { type: GraphQLString }
      },
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
