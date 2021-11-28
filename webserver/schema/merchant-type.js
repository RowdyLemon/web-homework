const graphql = require('graphql')
const {
  GraphQLObjectType,
  GraphQLString
} = graphql

const MerchantType = new GraphQLObjectType({
  name: 'Merchant',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString }
  })
})

module.exports = MerchantType
