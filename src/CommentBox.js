import React, { Component } from 'react';
import store from './store';
import { addComment, removeComment, updateComment } from './actionCreators';
import CommentList from './CommentList';
import CommentForm from './CommentForm';

export default class CommentBox extends Component {
    constructor(props) {
        super(props);
        this.state = store.getState();
    }

    componentDidMount() {
        this.unsubscribe = store.subscribe(this.onChange.bind(this));
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    onChange() {
        this.setState(store.getState());
    }

    handleCommentSubmit(comment) {
        comment.id = Date.now();
        comment.likes = 0;

        store.dispatch(addComment(comment));
    };

    handleCommentRemove(id) {
        store.dispatch(removeComment(id));
    };

    handleCommentUpdate(comment) {
        store.dispatch(updateComment(comment));
    };

    render() {
        return <div className="commentBox">
            <h1>Comments</h1>
            <CommentList data={this.state.data} onCommentRemove={this.handleCommentRemove.bind(this)}
                         onCommentUpdate={this.handleCommentUpdate.bind(this)}/>
            <CommentForm onCommentSubmit={this.handleCommentSubmit.bind(this)}/>
        </div>
    }
}
