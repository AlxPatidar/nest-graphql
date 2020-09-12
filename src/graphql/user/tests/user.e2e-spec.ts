import gql from 'graphql-tag';
import { map } from 'lodash';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloServerTestClient, createTestClient } from 'apollo-server-testing';

describe('User API E2E Test', () => {
    let apolloClient: ApolloServerTestClient;
    beforeEach(async () => {
        const module: GraphQLModule = global.app.get<GraphQLModule>(GraphQLModule);
        // apolloServer is protected, we need to cast module to any to get it
        apolloClient = createTestClient((module as any).apolloServer);
    });
    // create user mutation with apollo client 
    it('Create user mutation with apolloClient', async () => {
        // apollo client is used for only query and mutation testing
        const { query } = apolloClient;
        // createUser mutation query
        const mutationQuery = gql`mutation(
            $name: String!
            $email: String!
            $website: String!
            $phone: String!
            $address: AddressArgs!
          ) {
            createUser(
              user: {
                name: $name
                email: $email
                website: $website
                phone: $phone
                address: $address
              }
            ) {
              _id
              email
              name
              website
              phone
              address {
                street
                city
                zipcode
                geo {
                  lat
                  long
                }
              }
            }
          }
          `
        // call mutation query with variables 
        const { data }: any = await query({
            query: mutationQuery,
            // variables for mutation on query
            variables: {
                "name": "demo",
                "email": "demo@demo.com",
                "website": "http://localhost:4001/graphql",
                "phone": "1234567890",
                "address": {
                    "street": "demo street",
                    "city": "demo city",
                    "zipcode": "0000000",
                    "geo": { "lat": 12.55, "long": 12.78 }
                }
            },
        });
        // check response create new user id as a length of mongo id
        expect(data.createUser._id).toHaveLength(24)
        expect(data.createUser.name).toEqual("demo")
        expect(data.createUser.email).toEqual("demo@demo.com")
        expect(data.createUser.website).toEqual("http://localhost:4001/graphql")
        expect(data.createUser.phone).toEqual("1234567890")
        expect(data.createUser.address).toEqual({
            "street": "demo street",
            "city": "demo city",
            "zipcode": "0000000",
            "geo": { "lat": 12.55, "long": 12.78 }
        })
    });
    // fetch users list with apollo client and loop and check mongo id 
    it('Fetch users lists with apolloClient', async () => {
        // apollo client is used for only query and mutation testing
        const { query } = apolloClient;
        // fetch users list query
        const fetchUserQuery = gql`query {
            users{
              _id
              name
              email
              website
              phone
              address {
                street
                city
                zipcode
                geo {
                  lat
                  long
                }
              }
            }
          }
          `
        // call mutation query with variables 
        const { data }: any = await query({
            query: fetchUserQuery,
            // variables for mutation on query
            variables: {},
        });
        // check response loop user id as a length of mongo id
        map(data.users, user => {
            expect(user._id).toHaveLength(24)
        })
    });
});