import * as request from 'supertest';
import { Http2Server } from 'http2';
import { GraphQLSchemaHost } from '@nestjs/graphql';

import { subscribe, parse, graphql } from 'graphql';

describe('Comment graphql Subscription E2E Test', () => {
  let postId: String
  let server: Http2Server
  beforeEach(() => {
    server = global.app.getHttpServer()
  });
  // call mutation using graphql end point
  it('Create posts for testing subscription endpoint', async () => {
    // fetch posts list query
    const createPostMutation = `mutation($title: String!, $body: String!, $userId: String!) {
            createPost(post:{
              title: $title,
              body: $body,
              userId: $userId
            }) {
              _id
              title
              body
              updatedAt
              createdAt
            }
          }`
    // you can use app.inject if using NestFastifyApplication instead of NestExpressApplication
    return request(server)
      .post('/graphql')
      .send({
        query: createPostMutation, variables: {
          title: "id labore ex et quam laborum",
          body: "laudantium enim quasi est quidem magnam voluptate ipsam eos\ntemp",
          userId: "5f5346313f463e42545d1298"
        }
      })
      .set('Accept', 'application/json')
      .expect(200)
      .expect((res: any) => {
        postId = res.body.data.createPost._id
        expect(res.body.data.createPost._id).toHaveLength(24)
        expect(res.body.data.createPost.title).toEqual("id labore ex et quam laborum")
        expect(res.body.data.createPost.body).toEqual("laudantium enim quasi est quidem magnam voluptate ipsam eos\ntemp")
      })
  });
  // call graphql subscription
  it('Call graphql subscription', async () => {
    // create schema from graphql module
    // you can create graphql schema based on framework
    const { schema } = global.app.get<GraphQLSchemaHost>(GraphQLSchemaHost);
    const rootValue = {};
    const contextValue = {};
    // variables for mutation
    const variablesMutation = {
      comment: "laudantium enim quasi est quidem magnam voluptate ipsam eos temp",
      postId,
      userId: "5f53405ccd32a035466ac63f"
    };
    // variable for subscription
    const variablesSubscription = { postId };
    // subscription query for listen subscription
    const subscriptionQuery = `subscription($postId: String!) {
            commentAdded(postId: $postId) {
              _id
              postId
              userId
              comment
            }
        }`
    // mutation for trigger subscription or call subscription   
    const triggerMutation = `mutation($comment: String!, $postId: String!, $userId: String!) {
            createComment(
              comment: {
                comment: $comment
                postId: $postId
                userId: $userId
              }
            ) {
              _id
            }
          }`
    // make graphql hook for trigger subscription
    const triggerSubscription = graphql(schema, triggerMutation, rootValue, contextValue, variablesMutation);
    // subscribe subscription and then call mutation for trigger subscription
    const result: any = await subscribe(schema, parse(subscriptionQuery), triggerSubscription, contextValue, variablesSubscription);
    // on trigger call next and fetch subscription return value
    const { value } = await result.next()
    // compare subscription data and pass test as par requirement
    expect(value.data.commentAdded.comment).toEqual("laudantium enim quasi est quidem magnam voluptate ipsam eos temp")
    expect(value.data.commentAdded.postId).toEqual(postId)
    expect(value.data.commentAdded.userId).toEqual("5f53405ccd32a035466ac63f")
  });
});