import React from 'react';
import Relay from 'react-relay';
import Comment from './Comment';
import CommentForm from './CommentForm';

class CommentBox extends React.Component {
    handleCommentSubmit(comment) {};

    handleCommentRemove(id) {};

    handleCommentUpdate(comment) {};

    render() {
        let {commentList} = this.props;
        let commentNodes = commentList.comments.edges.map((edge) => {
            return <Comment
              key={edge.node.id}
              comment={edge.node}
              onCommentRemove={this.handleCommentRemove.bind(this)}
              onCommentUpdate={this.handleCommentUpdate.bind(this)}
            />
        });

        return <div className="commentBox">
            <h1>Comments</h1>
            <div className="commentList">
              {commentNodes}
            </div>
            <CommentForm
              onCommentSubmit={this.handleCommentSubmit.bind(this)}
            />
        </div>
    }
}

CommentBox = Relay.createContainer(CommentBox, {
  fragments: {
    commentList: () => Relay.QL`
      fragment on CommentList {
        id,
        comments(first: 100) {
          edges {
            node {
              id,
              ${Comment.getFragment('comment')},
            }
          }
        }
      }`
  }
});

export default CommentBox;
