import { map } from 'lodash';
import * as request from 'supertest';
import { Http2Server } from 'http2';

describe('Post graphql E2E Test', () => {
    let server: Http2Server
    beforeEach(() => {
        server = global.app.getHttpServer()
    });
    // fetch posts list with graphql endpoint
    it('Fetch posts lists with graphql endpoint', async () => {
        // fetch posts list query
        const fetchPostsQuery = `query {
            posts {
              _id
              title
              createdAt
              updatedAt
              body
              comments {
                comment
                postId
                userId
                createdAt
              }
            }
          }`
        // you can use app.inject if using NestFastifyApplication instead of NestExpressApplication
        return request(server)
            .post('/graphql')
            .send({ query: fetchPostsQuery })
            .set('Accept', 'application/json')
            .expect(200)
            .expect((res: any) => {
                // check response loop post id as a length of mongo id
                map(res.body.posts, post => {
                    expect(post._id).toHaveLength(24)
                    // post comments on posts list
                    map(post.comments, comment => {
                        expect(comment._id).toHaveLength(24)
                    })
                })
            })
    });

    // call mutation using graphql end point
    it('Create posts item with graphql endpoint', async () => {
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
                expect(res.body.data.createPost._id).toHaveLength(24)
                expect(res.body.data.createPost.title).toEqual("id labore ex et quam laborum")
                expect(res.body.data.createPost.body).toEqual("laudantium enim quasi est quidem magnam voluptate ipsam eos\ntemp")
            })
    });
});