import React from 'react';
import Relay from 'react-relay';
// import RemoveCommentMutation from './RemoveCommentMutation'

class Comment extends React.Component {
    rawMarkup(text) {
        let rawMarkup = marked(text, {sanitize: true});
        return {__html: rawMarkup};
    }

    handleCommentRemove() {
      // Relay.Store.commitUpdate(
      //   new RemoveCommentMutation({
      //     id: this.props.comment.__dataID__,
      //     store: this.props.store
      //   })
      // );
    }

    addLike() {
        this.handleCommentUpdate(this.props.likes + 1);
    }

    subtractLike() {
        this.handleCommentUpdate(this.props.likes - 1);
    }

    handleCommentUpdate(likes) {
        this.props.onCommentUpdate({
            id: this.props.id,
            author: this.props.author,
            text: this.props.text,
            likes: likes
        });
    }

    render() {
        let {comment} = this.props;
        return <div className="comment">
            <h2 className="commentAuthor">
                {comment.author}
            </h2>
            <span dangerouslySetInnerHTML={this.rawMarkup(comment.text)}/>
            <button onClick={this.handleCommentRemove.bind(this)}>Remove me</button>
            <button onClick={this.addLike.bind(this)}>+</button>
            <button onClick={this.subtractLike.bind(this)}>-</button>
            {comment.likes}
        </div>
    }
}

Comment = Relay.createContainer(Comment, {
  fragments: {
    comment: () => Relay.QL`
      fragment on Comment {
        author,
        text,
        likes,
      }`
  }
});

export default Comment;
