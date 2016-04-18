import React, { Component, PropTypes } from 'react';
import Comment from './Comment';

export default class CommentList extends Component {
    render() {
        let commentNodes = this.props.data.map((comment) => {
            return <Comment author={comment.author} text={comment.text} key={comment.id} id={comment.id}
                            likes={comment.likes}
                            onCommentRemove={this.props.onCommentRemove} onCommentUpdate={this.props.onCommentUpdate}/>
        });
        return <div className="commentList">
            {commentNodes}
        </div>
    }
}

CommentList.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object),
    onCommentRemove: PropTypes.func.isRequired,
    onCommentUpdate: PropTypes.func.isRequired
}