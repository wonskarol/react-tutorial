import React from 'react';
import Comment from './Comment';

export default class CommentList extends React.Component {
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