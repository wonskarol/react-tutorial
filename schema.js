import {
  GraphQLList,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLInt,
  GraphQLFloat,
  GraphQLEnumType,
  GraphQLNonNull
} from 'graphql';

import comments from './comments'

const Comment = new GraphQLObjectType({
  name: 'Comment',
  description: 'Represent the type of a comment',
  fields: () => ({
    id: {type: new GraphQLNonNull(GraphQLFloat)},
    author: {type: GraphQLString},
    text: {type: GraphQLString},
    likes: {type: GraphQLInt}
  })
});

const Query = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    comments: {
      type: new GraphQLList(Comment),
      resolve() {
        return comments;
      }
    }
  }
});

const Mutation = new GraphQLObjectType({
  name: 'Mutations',
  fields: {
    createComment: {
      type: new GraphQLList(Comment),
      args: {
        author: {type: GraphQLString},
        text: {type: GraphQLString}
      },
      resolve(rootValue, args) {
           let comment = Object.assign({
             id: Date.now(),
             likes: 0
           }, args);
           comments.push(comment);
           return comments;
         }
    },
    removeComment: {
      type: new GraphQLList(Comment),
      args: {
        id: {type: new GraphQLNonNull(GraphQLFloat)}
      },
      resolve(rootValue, args) {
        const index = comments.findIndex(comment => comment.id === args.id);

        if (index < 0) throw new Error('Comment not found!');

        comments.splice(index, 1);
        return comments;
      }
    },
    updateComment: {
      type: new GraphQLList(Comment),
      args: {
        id: {type: new GraphQLNonNull(GraphQLFloat)},
        author: {type: GraphQLString},
        text: {type: GraphQLString},
        likes: {type: GraphQLInt}
      },
      resolve(rootValue, args) {
        const index = comments.findIndex(comment => comment.id === args.id);

        if (index < 0) throw new Error('Comment not found!');

        comments[index] = args;
        return comments;
      }
    }
  }
});

const schema = new GraphQLSchema({
  query: Query,
  mutation: Mutation
});

export default schema;

/* Query & Mutation example

{
  comments {
    id
    author
    text
    likes
  }
}

mutation {
  createComment(
    author: "Karol"
    text: "hi graphql"
  ) {
    id
    author
    text
    likes
  }
}

mutation {
  removeComment(
		id: 1388534400000
  ) {
    id
    author
    text
    likes
  }
}

mutation {
  updateComment(
		id: 1388534400000
		author: "Karol"
    text: "testing mutation"
		likes: 2
  ) {
    id
    author
    text
    likes
  }
}

*/
