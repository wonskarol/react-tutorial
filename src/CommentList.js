import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Comment from './Comment';

class CommentList extends Component {
    render() {
        let commentNodes = this.props.comments.map((comment) => {
            return <Comment author={comment.author} text={comment.text} key={comment.id} id={comment.id}
                            likes={comment.likes} />
        });
        return <div className="commentList">
            {commentNodes}
        </div>
    }
}

CommentList.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object)
};

const mapStateToProps = (state) => {
    return {
        comments: state.comments
    }
};

CommentList = connect(mapStateToProps)(CommentList);

export default CommentList;
