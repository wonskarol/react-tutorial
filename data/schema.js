import {
  GraphQLList,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLInt,
  GraphQLFloat,
  GraphQLID,
  GraphQLEnumType,
  GraphQLNonNull
} from 'graphql';

import {
  nodeDefinitions,
  fromGlobalId,
  globalIdField,
  connectionDefinitions,
  connectionArgs,
  connectionFromArray,
  mutateAndGetPayload,
  mutationWithClientMutationId
} from 'graphql-relay';

import {
  Comment,
  CommentList,
  getComments,
  getCommentList
} from './../comments';

const {nodeInterface, nodeField} = nodeDefinitions(
  (globalId) => {
    const {type, id} = fromGlobalId(globalId);
    if (type === 'CommentList') {
      return getCommentList();
    } else {
      return null;
    }
  },
  (obj) => {
    if (obj instanceof CommentList) {
      return commentListType;
    } else {
      return null;
    }
  },
);

const commentType = new GraphQLObjectType({
  name: 'Comment',
  description: 'Details of comment',
  fields: () => ({
    id: globalIdField('Comment'),
    author: {type: GraphQLString},
    text: {type: GraphQLString},
    likes: {type: GraphQLInt}
  }),
  interfaces: [nodeInterface]
});

const {connectionType: commentConnection} =
  connectionDefinitions({name: 'Comment', nodeType: commentType});

const commentListType = new GraphQLObjectType({
  name: 'CommentList',
  description: 'List of comments',
  fields: () => ({
    id: globalIdField('CommentList'),
    comments: {
      type: commentConnection,
      args: connectionArgs,
      resolve: (_, args) => connectionFromArray(getComments(), args)
    }
  }),
  interfaces: [nodeInterface]
});

const queryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    node: nodeField,
    commentList: {
      type: commentListType,
      resolve: () => getCommentList()
    }
  })
});

const schema = new GraphQLSchema({
  query: queryType
});

export default schema;

// let store = {};
//
// const Comment = new GraphQLObjectType({
//   name: 'Comment',
//   description: 'Represent the type of a comment',
//   fields: () => ({
//     id: {
//       type: new GraphQLNonNull(GraphQLID),
//       resolve: (obj) => obj.id
//     },
//     author: {type: GraphQLString},
//     text: {type: GraphQLString},
//     likes: {type: GraphQLInt}
//   })
// });
//
// const commentConnection = connectionDefinitions({
//   name: 'Comment',
//   nodeType: Comment
// });
//
// const Store = new GraphQLObjectType({
//   name: 'Store',
//   description: 'Represent the type of a store',
//   fields: () => ({
//     id: globalIdField('Store'),
//     commentConnection: {
//       type: commentConnection.connectionType,
//       args: connectionArgs,
//       resolve: (_, args) => connectionFromArray(
//         comments,
//         args
//       )
//     }
//   })
// });
//
// const Query = new GraphQLObjectType({
//   name: 'Query',
//   fields: {
//     store: {
//       type: Store,
//       resolve: () => store
//     }
//   }
// });
//
// const Mutation = new GraphQLObjectType({
//   name: 'Mutations',
//   fields: {
//     createComment: mutationWithClientMutationId({
//       name: 'CreateComment',
//       inputFields: {
//           author: {type: GraphQLString},
//           text: {type: GraphQLString}
//       },
//       outputFields: {
//         commentEdge: {
//           type: commentConnection.edgeType,
//           resolve: (obj) => ({node: obj, cursor: obj.id})
//         },
//         store: {
//           type: Store,
//           resolve: () => store
//         }
//       },
//       mutateAndGetPayload: ({author, text}) => {
//           comments.push({
//             author,
//             text,
//             id: Date.now(),
//             likes: 0,
//           });
//
//           return comments[comments.length-1];
//       }
//
//       // type: new GraphQLList(Comment),
//       // args: {
//       //   author: {type: GraphQLString},
//       //   text: {type: GraphQLString}
//       // },
//       // resolve(rootValue, args) {
//       //      let comment = Object.assign({
//       //        id: Date.now(),
//       //        likes: 0
//       //      }, args);
//       //      comments.push(comment);
//       //      return comments;
//       //    }
//     }),
//     removeComment: mutationWithClientMutationId({
//       name: 'RemoveComment',
//       inputFields: {
//         id: {type: new GraphQLNonNull(GraphQLString)}
//       },
//       outputFields: {
//         commentEdge: {
//           type: commentConnection.edgeType,
//           resolve: (obj) => ({node: obj, cursor: obj.id})
//         },
//         store: {
//           type: Store,
//           resolve: () => store
//         }
//       },
//       mutateAndGetPayload: ({id}) => {
//           const index = comments.findIndex(comment => comment.id === id);
//
//           console.log(id);
//
//           if (index < 0) throw new Error('Comment not found!');
//
//           return comments.splice(index, 1)[0];
//           // return comments;
//       }
//       // type: new GraphQLList(Comment),
//       // args: {
//       //   id: {type: new GraphQLNonNull(GraphQLString)}
//       // },
//       // resolve(rootValue, args) {
//       //   const index = comments.findIndex(comment => comment.id === args.id);
//       //
//       //   if (index < 0) throw new Error('Comment not found!');
//       //
//       //   comments.splice(index, 1);
//       //   return comments;
//       // }
//     })
//     // updateComment: {
//     //   type: new GraphQLList(Comment),
//     //   args: {
//     //     id: {type: new GraphQLNonNull(GraphQLString)},
//     //     author: {type: GraphQLString},
//     //     text: {type: GraphQLString},
//     //     likes: {type: GraphQLInt}
//     //   },
//     //   resolve(rootValue, args) {
//     //     const index = comments.findIndex(comment => comment.id === args.id);
//     //
//     //     if (index < 0) throw new Error('Comment not found!');
//     //
//     //     comments[index] = args;
//     //     return comments;
//     //   }
//     // }
//   }
// });
//
// const schema = new GraphQLSchema({
//   query: Query,
//   mutation: Mutation
// });
//
// export default schema;

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
