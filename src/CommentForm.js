import React, { Component, PropTypes } from 'react';

export default class CommentForm extends Component {
    handleSubmit(event) {
        event.preventDefault();
        let author = event.target.author.value;
        let text = event.target.text.value;
        if (!text || !author) {
            return;
        }
        this.props.onCommentSubmit({author, text});
        //reset inputs
        event.target.author.value = '';
        event.target.text.value = '';
    }

    render() {
        return <form className="commentForm" onSubmit={this.handleSubmit.bind(this)}>
            <input
                name="author"
                type="text"
                placeholder="Your name"
            />
            <input
                name="text"
                type="text"
                placeholder="Say something..."
            />
            <input type="submit" value="Post"/>
        </form>
    }
}

CommentForm.propTypes = {
    onCommentSubmit: PropTypes.func.isRequired
}
