import React from 'react';
import Comment from './Comment';

export default class CommentList extends React.Component {
    render() {
        let onCommentRemove = this.props.onCommentRemove;
        let commentNodes = this.props.data.map((comment) => {
            return <Comment author={comment.author} key={comment.id} id={comment.id} onCommentRemove={onCommentRemove}>
                {comment.text}
            </Comment>
        });
        return <div className="commentList">
            {commentNodes}
        </div>
    }
}