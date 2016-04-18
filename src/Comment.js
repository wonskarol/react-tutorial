import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { removeComment, updateComment } from './actionCreators';


export default class Comment extends Component {
    rawMarkup() {
        let rawMarkup = marked(this.props.text.toString(), {sanitize: true});
        return {__html: rawMarkup};
    }

    handleCommentRemove() {
        this.props.onCommentRemove(this.props.id);
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
        return <div className="comment">
            <h2 className="commentAuthor">
                {this.props.author}
            </h2>
            <span dangerouslySetInnerHTML={this.rawMarkup()}/>
            <button onClick={this.handleCommentRemove.bind(this)}>Remove me</button>
            <button onClick={this.addLike.bind(this)}>+</button>
            <button onClick={this.subtractLike.bind(this)}>-</button>
            {this.props.likes}
        </div>
    }
}

Comment.propTypes = {
    author: PropTypes.string,
    text: PropTypes.string,
    id: PropTypes.number.isRequired,
    likes: PropTypes.number.isRequired,
    onCommentRemove: PropTypes.func.isRequired,
    onCommentUpdate: PropTypes.func.isRequired
}

const mapDispatchToProps = (dispatch) => {
    return {
        onCommentUpdate: (comment) => {
            dispatch(updateComment(comment))
        },
        onCommentRemove: (id) => {
          dispatch(removeComment(id));
        }
    }
};

Comment = connect(undefined, mapDispatchToProps)(Comment);

export default Comment;
